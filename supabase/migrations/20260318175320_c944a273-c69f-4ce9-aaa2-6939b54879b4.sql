CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, is_parent, num_kids)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data ->> 'username', 'Student_' || LEFT(new.id::text, 8)),
    COALESCE((new.raw_user_meta_data ->> 'is_parent')::boolean, false),
    COALESCE((new.raw_user_meta_data ->> 'num_kids')::integer, 0)
  );

  INSERT INTO public.streaks (user_id, current_streak, longest_streak)
  VALUES (new.id, 0, 0);

  INSERT INTO public.skill_ratings (user_id, math_rating, english_rating, overall_rating)
  VALUES (new.id, 1200, 1200, 1200);

  RETURN new;
END;
$$;