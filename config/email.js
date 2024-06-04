// config/email.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// SMTP 설정
const transporter = nodemailer.createTransport({
  host: 'smtp.naver.com', // SMTP 서버 호스트
  port: 587, // SMTP 포트 (예: 587 for TLS)
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.NAVER_ID, // SMTP 계정 사용자
    pass: process.env.NAVER_PW // SMTP 계정 비밀번호
  }
});

// 이메일 전송 함수
async function sendEmail(to, subject, text) {
  const mailOptions = {
    from: `"ssb" <${process.env.NAVER_ID}>`, // 발신자 주소
    to, // 수신자 주소
    subject, // 이메일 제목
    text, // 이메일 본문 (텍스트)
    // html: '<b>Hello world?</b>' // 이메일 본문 (HTML)
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email: ' + error);
  }
}

export default sendEmail
