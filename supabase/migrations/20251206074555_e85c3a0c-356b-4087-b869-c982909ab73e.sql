-- Add time limit column to battle_rooms (in seconds, NULL means no limit)
ALTER TABLE public.battle_rooms
ADD COLUMN time_limit_seconds integer DEFAULT NULL;