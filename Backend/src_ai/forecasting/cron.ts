import { spawn } from 'child_process';
import cron from 'node-cron';

// Run forecasting retraining once per day at midnight
cron.schedule('0 0 * * *', () => {
  const child = spawn('python3', [`${__dirname}/train_forecasting.py`], { stdio: 'inherit' });

  child.on('close', (code) => {
    if (code !== 0) {
      console.error(`Forecast retraining exited with code ${code}`);
    }
  });
});

console.log('Forecasting cron job scheduled.');
