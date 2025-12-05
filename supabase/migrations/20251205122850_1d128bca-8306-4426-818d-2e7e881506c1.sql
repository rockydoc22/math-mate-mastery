-- Fix achievements table to require authentication for viewing
DROP POLICY "Anyone can view achievements" ON achievements;
CREATE POLICY "Authenticated users can view achievements" 
ON achievements FOR SELECT 
USING (auth.uid() IS NOT NULL);