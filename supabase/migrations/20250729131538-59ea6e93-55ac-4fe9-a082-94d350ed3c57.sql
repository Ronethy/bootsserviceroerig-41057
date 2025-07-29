-- Update the cron job to run every hour instead of every 5 days
SELECT cron.unschedule('keep-database-alive');

SELECT cron.schedule(
  'keep-database-alive',
  '0 * * * *', -- Every hour at minute 0
  $$
  SELECT
    net.http_post(
      url:='https://bfnvngjthcdbmthluwhi.supabase.co/functions/v1/keep-alive',
      headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmbnZuZ2p0aGNkYm10aGx1d2hpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MTg2MzgsImV4cCI6MjA2MDE5NDYzOH0.hhOwSS0LW4AksPUMrGFDX_8zNF434DF-AIAR253YE8U"}'::jsonb,
      body:='{"scheduled": true}'::jsonb
    ) as request_id;
  $$
);