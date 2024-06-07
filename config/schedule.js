import schedule from "node-schedule";
import GoalCapsuleDao from "../dao/goalCapsuleDao.js";
import time from "../lib/timeUtil.js"
import logger from "../lib/logger.js";
import sendEmail from './email.js';
import userDao from "../dao/userDao.js";



async function checkGoalAndUpdateDB() {
  console.log("🚀 ~ in checkGoalAndUpdateDB");
  let capsules = null;
  try {
    capsules = await GoalCapsuleDao.selectAll();
    logger.info("selectAll schedule ");
  } catch (error) {
    logger.error("schedule selectAll error : ",error.message);
  }
  
  for (const capsule of capsules) {
    let params = {
      id: capsule.id,
      dailyCheck: false,
    };
    
    const left_day = time.diffDay(capsule.expired,capsule.createdAt); //남은일수
    const left_count = capsule.goalCount - capsule.nowCount; //남은횟수
    
    if (left_day < left_count) {
      params.isFailed = true;
      
      try {
        let userEmail = null;
        if (capsule.email) {
          userEmail = capsule.email; // 타인
        } else {
          user = await userDao.selectUser({id: capsule.userId}) //자신
          userEmail = user.email;
        }
        const to = userEmail;
        const subject = "this is failed mail";
        const text = `
          User ID: ${user.userId}
          capsule Info: ${capsule}
        `;
        await sendEmail(to, subject, text);
        console.log('Email sent successfully - 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀');
      } catch (error) {
        console.log('Error sending email: ', error);
      }
    }
    try {
      const updated =await GoalCapsuleDao.update(params);
      logger.info("Updated schedule: ", updated);
    } catch (error) {
      logger.error("schedule update error : ",error.message);
    }
  }
  return ;
}





// 스케줄링 작업 설정
const job = schedule.scheduleJob('1 0 0 * * *', () => {
  console.log("🚀 ~ job : ")
  checkGoalAndUpdateDB();
});

export { job };