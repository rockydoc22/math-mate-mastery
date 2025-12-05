-- Fix daily_challenges table to require authentication for viewing
DROP POLICY "Users can view all daily challenges" ON daily_challenges;
CREATE POLICY "Authenticated users can view daily challenges" 
ON daily_challenges FOR SELECT 
USING (auth.uid() IS NOT NULL);