-- Temporarily allow service-role cleanup of rate limits by truncating old entries
DELETE FROM email_rate_limits WHERE email = 'mjw22@hotmail.com';