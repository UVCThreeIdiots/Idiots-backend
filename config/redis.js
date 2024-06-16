import { redisClient } from '../app.js';

async function setVerifyToken(userEmail, expired, token) {
  try {
    await redisClient.setEx(userEmail, expired, token); // setEx 사용
    console.log("🚀 ~ setVerifyToken ~ client.setEx(userEmail, expired, token):");
  } catch (err) {
    console.error('Error setting verification token:', err);
  }
}

async function checkVerifyToken(userEmail, inputToken) {
  try {
    console.log("🚀 ~ checkVerifyToken ~ checkVerifyToken:");
    const storedToken = await redisClient.get(userEmail);
    console.log("🚀 ~ checkVerifyToken ~ storedToken:", storedToken)
    if (storedToken === inputToken) {
      console.log('Verification successful');
      return true;
    } else {
      console.log('Verification failed');
      return false;
    }
  } catch (err) {
    console.error('Error checking verification token:', err);
  }
}

async function checkVerifyTokenFindPw(inputToken) {
  try {
    console.log("🚀 ~ checkVerifyTokenFindPw ~ checkVerifyTokenFindPw:");
    const userEmail = await redisClient.get(inputToken);
    console.log("🚀 ~ checkVerifyTokenFindPw ~ userEmail:", userEmail)
    if (userEmail) {
      console.log('Verification successful');
      return userEmail;
    } else {
      console.log('Verification failed');
      return false;
    }
  } catch (err) {
    console.error('Error checking verification token:', err);
  }
}

// Redis 클라이언트 종료
process.on('exit', () => {
  client.quit();
});

export { setVerifyToken, checkVerifyToken, checkVerifyTokenFindPw };
