import { createClient } from 'redis';

const client = createClient();

// Redis 클라이언트 연결
client.on('connect', () => {
  console.log('Connected to Redis...');
});

client.on('error', (err) => {
  console.error('Redis Client Error', err);
});

// 비동기 연결
await client.connect();

async function setVerifyToken(userEmail, expired, token) {
  try {
    await client.setEx(userEmail, expired, token); // setEx 사용
    console.log("🚀 ~ setVerifyToken ~ client.setEx(userEmail, expired, token):");
  } catch (err) {
    console.error('Error setting verification token:', err);
  }
}

async function checkVerifyToken(userEmail, inputToken) {
  try {
    console.log("🚀 ~ checkVerifyToken ~ checkVerifyToken:");
    const storedToken = await client.get(userEmail);
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

// Redis 클라이언트 종료
process.on('exit', () => {
  client.quit();
});

export { setVerifyToken, checkVerifyToken };
