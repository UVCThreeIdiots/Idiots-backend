import schedule from "node-schedule";
import GoalCapsuleDao from "../dao/goalCapsuleDao.js";
import time from "../lib/timeUtil.js"
import logger from "../lib/logger.js";
import { sendEmail } from './email.js';
import userDao from "../dao/userDao.js";



async function checkGoalAndUpdateDB() {
  console.log("🚀 ~ in checkGoalAndUpdateDB");
  let capsules = null;
  try {
    capsules = await GoalCapsuleDao.selectAllWithoutFailedSuccess();
    logger.info("selectAllWithoutFailedSuccess schedule ");
  } catch (error) {
    logger.error("schedule selectAllWithoutFailedSuccess error : ",error.message);
  }
  
  for (const capsule of capsules) {
    let params = {
      id: capsule.id,
      dailyCheck: false,
    };
    
    const left_day = time.diffDay(capsule.expired, time.getNow()); //남은일수
    console.log("🚀 ~ left_day:", left_day)
    const left_count = capsule.goalCount - capsule.nowCount; //남은횟수
    console.log("🚀 ~ left_count:", left_count)
    
    if (left_day < left_count) {
      console.log("🚀 ~ if (left_day < left_count):")
      
      params.isFailed = true;
      
      try {
        const user = await userDao.selectUser({id: capsule.userId})
        const userEmail = user.email;
        let subUser = null;
        let subTo = null;
        if (capsule.otherEmail) { //타인
          console.log("🚀 ~ checkGoalAndUpdateDB ~ if (capsule.otherEmail) { //타인:") 
          subUser = await userDao.selectUser({id : capsule.otherId})
          subTo = subUser.email;
          console.log("🚀 ~ subTo:", subTo)

        }
        const to = userEmail;
        const subject = "골캡슐 목표 달성 실패";
        let html = `
        <div style="text-align: center; padding: 20px;">
          <h2>골캡슐 목표 달성 실패</h2>
          <p>안녕하세요,</p>
          <p>아쉽게도 ${user.name}님께서 설정한 '${capsule.title}' 목표를 달성하지 못했습니다.</p>
          <p>다음번에는 꼭 목표를 달성하시길 응원합니다!</p>
          <p>감사합니다,<br/>ThreeIdiots 팀</p>
        </div>
        `;
        if (subTo){
          html = `
        <div style="text-align: center; padding: 20px;">
          <h2>골캡슐 목표 달성 실패</h2>
          <p>안녕하세요,</p>
          <p>아쉽게도 ${user.name}님께서 ${subUser.name}님에게 보낸 '${capsule.title}' 목표를 달성하지 못했습니다.</p>
          <p>다음번에는 꼭 목표를 달성하시길 응원합니다!</p>
          <p>감사합니다,<br/>ThreeIdiots 팀</p>
        </div>
        `;
          await sendEmail(subTo, subject, html);
          console.log("Email sent subTO successfully - 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀");
        }
        await sendEmail(to, subject, html);
        console.log('Email sent successfully - 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀');
      } catch (error) {
        console.log('Error sending email: ', error);
      }
    }
    try {
      const updated =await GoalCapsuleDao.update(params);
      logger.info("Updated schedule: ");
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
