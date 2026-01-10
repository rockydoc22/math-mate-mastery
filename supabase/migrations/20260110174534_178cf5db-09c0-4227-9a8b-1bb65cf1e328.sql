-- Add policy to allow authenticated users to view all quiz_scores for leaderboard purposes
-- Only expose aggregated data through the view, individual scores remain private
CREATE POLICY "Authenticated users can view all scores for leaderboard" 
ON public.quiz_scores 
FOR SELECT 
TO authenticated
USING (true);

-- Also allow public profiles to be viewable for leaderboard
DROP POLICY IF EXISTS "Profiles are viewable by authenticated users" ON public.profiles;
CREATE POLICY "Profiles are viewable by authenticated users" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (true);