import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();  // node.js에서는 process.env로 환경변수에 접근하는데 dotenv.config()를 해줘야 우리가 .env에 명시해둔 환경변수들이 process.env 객체에 들어감

const app = express();

app.set('port', process.env.PORT || 3000); // port 설정 : .env에 있는 PORT가 없으면 3000번 포트로 연결

app.use(express.json());  // 클라이언트가 서버로 JSON 데이터를 보내는 경우, 이 미들웨어를 사용하여 요청 본문을 JavaScript 객체로 변환합니다. (req.body 접근 가능해짐)
app.use(express.urlencoded({ extended: false })); // url 쿼리 파싱
app.use(cookieParser());  // 쿠키 파싱 (req.cookies로 접근 가능)

app.get('/', (req, res) => {
  res.send('Hello World!');

});

app.listen(app.get('port'), () => {
  console.log(`Server on port http://localhost:${app.get('port')}`);
});