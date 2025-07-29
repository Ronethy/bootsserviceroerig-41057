-- Enable pg_cron extension for scheduled jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Enable pg_net extension for HTTP requests
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create cron job to ping database every 5 days at midnight
SELECT cron.schedule(
  'keep-database-alive',
  '0 0 */5 * *', -- At midnight every 5 days
  $$
  SELECT
    net.http_post(
        url:='https://bfnvngjthcdbmthluwhi.supabase.co/functions/v1/keep-alive',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmbnZuZ2p0aGNkYm10aGx1d2hpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MTg2MzgsImV4cCI6MjA2MDE5NDYzOH0.hhOwSS0LW4AksPUMrGFDX_8zNF434DF-AIAR253YE8U"}'::jsonb,
        body:='{"triggered_by": "cron", "purpose": "keep_alive"}'::jsonb
    ) as request_id;
  $$
);