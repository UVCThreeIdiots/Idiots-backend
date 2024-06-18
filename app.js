import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import boss from './config/pgBoss.js';
import './config/schedule.js';
import path from 'path';
import session from 'express-session';
import passport from './config/passport.js';
import { createClient } from 'redis';
import RedisStore from 'connect-redis';

import db from './models/index.js';

import indexRouter from './routes/index.js';


const corsOptions = {
  origin: 'http://13.125.169.9:5173', // Vue 앱의 도메인
  credentials: true // 자격 증명 허용
};

dotenv.config();  // node.js에서는 process.env로 환경변수에 접근하는데 dotenv.config()를 해줘야 우리가 .env에 명시해둔 환경변수들이 process.env 객체에 들어감

const app = express();
const __dirname = process.cwd();


app.set('port', process.env.PORT || 3000); // port 설정 : .env에 있는 PORT가 없으면 3000번 포트로 연결

app.use(cors(corsOptions)); // CORS 설정

app.use(express.json());  // 클라이언트가 서버로 JSON 데이터를 보내는 경우, 이 미들웨어를 사용하여 요청 본문을 JavaScript 객체로 변환합니다. (req.body 접근 가능해짐)
app.use(express.urlencoded({ extended: false })); // url 쿼리 파싱
app.use(cookieParser());  // 쿠키 파싱 (req.cookies로 접근 가능)


db.sequelize.authenticate().then(() => {
  console.log('DB connection Success!');
  db.sequelize.sync({alter: true}).then(async () => {
    console.log('DB sync Success!');
    boss.start().then(() => {
      console.log('pgBoss started');
    }).catch((err) => {
      console.error('pgBoss error', err);
    });
  }).catch((err) => { console.error('db sync error', err); });
}).catch((err) => { console.error('db connect fail!', err); });

// Redis 클라이언트 설정
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('connect', () => {
  console.log('Connected to Redis...');
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

await redisClient.connect();

// connect-redis와 express-session 설정
const RedisStoreInstance = new RedisStore({
  client: redisClient,
  prefix: 'sess:', // 세션 키의 접두사 설정 (선택 사항)
});

// 세션 설정
app.use(session({
  store: RedisStoreInstance, // 생성한 RedisStore 인스턴스를 세션 저장소로 사용합니다.
  name: 'mySessionName', // 세션 쿠키의 이름을 설정합니다.
  secret: process.env.SESSION_SECRET, // 세션 암호화를 위한 비밀 키를 환경 변수에서 가져와 설정합니다.
  resave: false, // 세션이 변경되지 않은 경우에도 저장소에 다시 저장하지 않도록 설정합니다.
  saveUninitialized: false, // 초기화되지 않은 세션을 저장하지 않도록 설정합니다.
  cookie: {
    path: '/', // 쿠키가 도메인의 모든 경로에서 유효하도록 설정합니다.
    secure: false, // 배포 환경에서는 secure 속성을 true로 설정하여 HTTPS를 통해서만 쿠키를 전송하도록 합니다.
    httpOnly: false, // JavaScript를 통해 쿠키에 접근하지 못하도록 설정하여 보안을 강화합니다.
    sameSite: 'strict', // CSRF 방지를 위해 SameSite 속성을 'strict'로 설정합니다.
    maxAge: 1 * 60 * 60 * 1000 // 쿠키의 유효 기간을 24시간(1일)으로 설정합니다.
  },
  unset: 'destroy' // 세션 무효화 시 쿠키를 삭제하도록 설정합니다.
})); 

app.use(passport.initialize()); //req에 passport 설정을 심어줌
app.use(passport.session()); //req에 req.session 객체에 passport 정보를 저장

app.use('/', indexRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(app.get('port'),'0.0.0.0', () => {
  console.log(`Server on port http://13.125.169.9:${app.get('port')}`);
});

export { redisClient }; // 다른 모듈에서 재사용할 수 있도록 내보내기
