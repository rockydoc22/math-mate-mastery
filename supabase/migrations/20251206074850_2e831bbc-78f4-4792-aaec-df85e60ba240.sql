-- Add battle mode column (normal or sudden_death)
ALTER TABLE public.battle_rooms
ADD COLUMN battle_mode text NOT NULL DEFAULT 'normal';