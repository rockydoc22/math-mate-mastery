-- Add is_solo column to battle_rooms for solo vs SAT mode
ALTER TABLE public.battle_rooms
ADD COLUMN is_solo boolean NOT NULL DEFAULT false;