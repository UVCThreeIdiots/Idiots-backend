import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';



dotenv.config();

const projectRoot = process.cwd();
const logDirectory = path.join(projectRoot, 'logs');

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const dailyRotateFileTransport = new DailyRotateFile({
  filename: path.join(logDirectory, '%DATE%.log'), // 로그 파일명 (%DATE%는 날짜로 대체됨)
  datePattern: 'YYYY-MM-DD', // 로그 파일 날짜 패턴
  zippedArchive: true, // 로그 파일 압축 여부
  maxSize: '20m', // 로그 파일 최대 크기 (20MB)
  maxFiles: '14d', // 보관할 로그 파일 최대 수 (14일)
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // 타임스탬프 추가
    format.printf(info => `${info.timestamp} [${info.level}] ${info.message}`) // 로그 출력 형식
  ),
});


const logger = createLogger({
  level: process.env.LOGGER_LEVEL || 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors(),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: path.join(logDirectory, 'error.log'), level: 'error' }),
    dailyRotateFileTransport
  ]
});


if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }));
}

// example

// logger.log({
//   level: 'info',
//   message: 'Pass an object and this works',
//   additional: 'properties',
//   are: 'passed along'
// });
// logger.info({
//   message: 'Use a helper method if you want',
//   additional: 'properties',
//   are: 'passed along'
// });
// logger.log('info', 'Pass a message and this works', {
//   additional: 'properties',
//   are: 'passed along'
// });
// logger.info('Use a helper method if you want', {
//   additional: 'properties',
//   are: 'passed along'
// });
// logger.log('info', 'test message %s', 'my string');
// logger.log('info', 'test message %d', 123);
// logger.log('info', 'test message %s, %s', 'first', 'second', { number: 123 });
// logger.info('Found %s at %s', 'error', new Date());
// logger.info('Found %s at %s', 'error', new Error('chill winston'));
// logger.info('Found %s at %s', 'error', /WUT/);
// logger.info('Found %s at %s', 'error', true);
// logger.info('Found %s at %s', 'error', 100.00);
// logger.info('Found %s at %s', 'error', ['1, 2, 3']);
// logger.warn(new Error('Error passed as info'));
// logger.log('error', new Error('Error passed as message'));
// logger.warn('Maybe important error: ', new Error('Error passed as meta'));
// logger.log('error', 'Important error: ', new Error('Error passed as meta'));
// logger.error(new Error('Error as info'));


export default logger;