-- Create fighter_avatars table for customization
CREATE TABLE public.fighter_avatars (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE UNIQUE,
  base_type TEXT NOT NULL DEFAULT 'human',
  weapon TEXT DEFAULT NULL,
  aura_color TEXT DEFAULT NULL,
  scar_overlay TEXT DEFAULT NULL,
  helmet_style TEXT DEFAULT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.fighter_avatars ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view their own fighter avatar"
  ON public.fighter_avatars FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own fighter avatar"
  ON public.fighter_avatars FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own fighter avatar"
  ON public.fighter_avatars FOR UPDATE
  USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_fighter_avatars_updated_at
  BEFORE UPDATE ON public.fighter_avatars
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();