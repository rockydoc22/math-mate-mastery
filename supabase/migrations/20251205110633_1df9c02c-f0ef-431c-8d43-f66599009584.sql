-- Create battle_rooms table for multiplayer challenges
CREATE TABLE public.battle_rooms (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    host_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    room_code text UNIQUE NOT NULL,
    status text NOT NULL DEFAULT 'waiting',
    subject text NOT NULL DEFAULT 'both',
    question_count integer NOT NULL DEFAULT 10,
    max_players integer NOT NULL DEFAULT 8,
    current_question_index integer NOT NULL DEFAULT 0,
    started_at timestamp with time zone,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT valid_status CHECK (status IN ('waiting', 'in_progress', 'completed')),
    CONSTRAINT valid_subject CHECK (subject IN ('math', 'english', 'both')),
    CONSTRAINT valid_question_count CHECK (question_count IN (5, 10, 15)),
    CONSTRAINT valid_max_players CHECK (max_players BETWEEN 2 AND 8)
);

-- Create battle_participants table
CREATE TABLE public.battle_participants (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id uuid REFERENCES public.battle_rooms(id) ON DELETE CASCADE NOT NULL,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    score integer NOT NULL DEFAULT 0,
    answers_correct integer NOT NULL DEFAULT 0,
    current_question integer NOT NULL DEFAULT 0,
    finished_at timestamp with time zone,
    joined_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE(room_id, user_id)
);

-- Create battle_answers table to track individual answers with timing
CREATE TABLE public.battle_answers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id uuid REFERENCES public.battle_rooms(id) ON DELETE CASCADE NOT NULL,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    question_index integer NOT NULL,
    is_correct boolean NOT NULL,
    time_taken_ms integer NOT NULL,
    points_earned integer NOT NULL DEFAULT 0,
    answered_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE(room_id, user_id, question_index)
);

-- Enable RLS
ALTER TABLE public.battle_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.battle_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.battle_answers ENABLE ROW LEVEL SECURITY;

-- RLS policies for battle_rooms
CREATE POLICY "Anyone can view battle rooms" ON public.battle_rooms FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create rooms" ON public.battle_rooms FOR INSERT WITH CHECK (auth.uid() = host_id);
CREATE POLICY "Host can update their room" ON public.battle_rooms FOR UPDATE USING (auth.uid() = host_id);

-- RLS policies for battle_participants
CREATE POLICY "Anyone can view participants" ON public.battle_participants FOR SELECT USING (true);
CREATE POLICY "Authenticated users can join rooms" ON public.battle_participants FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own participation" ON public.battle_participants FOR UPDATE USING (auth.uid() = user_id);

-- RLS policies for battle_answers
CREATE POLICY "Participants can view room answers" ON public.battle_answers FOR SELECT USING (true);
CREATE POLICY "Users can insert their own answers" ON public.battle_answers FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Enable realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.battle_rooms;
ALTER PUBLICATION supabase_realtime ADD TABLE public.battle_participants;
ALTER PUBLICATION supabase_realtime ADD TABLE public.battle_answers;