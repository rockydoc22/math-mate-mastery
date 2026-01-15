-- Add email column to profiles table for username lookup
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;

-- Create index for faster username lookups
CREATE INDEX IF NOT EXISTS idx_profiles_username_lower ON public.profiles (LOWER(username));
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles (email);

-- Update existing profiles with email from auth.users
UPDATE public.profiles p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id AND p.email IS NULL;

-- Update the handle_new_user function to also store email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, username, email)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data ->> 'username', 'Student_' || LEFT(new.id::text, 8)),
    new.email
  );
  
  INSERT INTO public.streaks (user_id, current_streak, longest_streak)
  VALUES (new.id, 0, 0);
  
  INSERT INTO public.skill_ratings (user_id, math_rating, english_rating, overall_rating)
  VALUES (new.id, 1200, 1200, 1200);
  
  RETURN new;
END;
$function$;

-- Create function to get email by username (case-insensitive)
CREATE OR REPLACE FUNCTION public.get_email_by_username(lookup_username TEXT)
RETURNS TEXT
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT email
  FROM public.profiles
  WHERE LOWER(username) = LOWER(lookup_username)
  LIMIT 1;
$function$;

-- Create function to get username by email
CREATE OR REPLACE FUNCTION public.get_username_by_email(lookup_email TEXT)
RETURNS TEXT
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT username
  FROM public.profiles
  WHERE LOWER(email) = LOWER(lookup_email)
  LIMIT 1;
$function$;