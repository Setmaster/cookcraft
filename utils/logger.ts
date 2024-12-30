import { createLogger, format, transports } from 'winston';
import fs from 'fs';
import path from 'path';

// Ensure the logs folder exists
const logDir = path.resolve('./logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir); // Create the logs folder if it doesn't exist
}

const logger = createLogger({
  level: 'info', // Default log level
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }), // Include stack trace for errors
    format.json() // Output logs in JSON format
  ),
  transports: [
    new transports.Console(), // Log to the console
    new transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }), // Error logs
    new transports.File({ filename: path.join(logDir, 'combined.log') }) // All logs
  ]
});

export default logger;
