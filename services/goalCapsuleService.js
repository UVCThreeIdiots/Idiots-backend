import { sendEmail } from '../config/email.js';
import GoalCapsuleDao from '../dao/goalCapsuleDao.js';
import userDao from '../dao/userDao.js';
import logger from '../lib/logger.js';
import time from '../lib/timeUtil.js';

const goalCapsuleService = {
  async createCapsule(params) {
    logger.info('goalCapsuleService createCapsule', params);
    try {
      const imageFiles = [];

    if(params.files) {
      params.files.forEach(file => {
          imageFiles.push(file.s3Url);
      });
    }
      const newGoalTerm = params.goalTerm * 7;
      console.log("🚀 ~ createCapsule ~ params.goalTerm:", params.goalTerm)
      console.log("🚀 ~ createCapsule ~ newGoalTerm:", newGoalTerm)
      console.log("🚀 ~ createCapsule ~ params.expired:", params.expired)
      const newExpired = time.addDay({
        expired: params.expired,
        goalTerm: newGoalTerm
      });
      console.log("🚀 ~ createCapsule ~ newExpired:", newExpired)
      const newParams = {
        ...params,
        expired: newExpired,
        goalTerm: newGoalTerm,
        imagePath: imageFiles,
      }
      const newCapsule = await GoalCapsuleDao.insert(newParams);
      const user = await userDao.selectUser({id: newParams.userId});
      if (newCapsule.otherEmail) {
        const to = newCapsule.otherEmail;
        const subject = `새로운 골캡슐이 도착했습니다!`;
        const html = `
        <div style="text-align: center; padding: 20px;">
          <h2>새로운 골캡슐이 도착했습니다!</h2>
          <p>안녕하세요,</p>
          <p>${user.name}님께서 당신에게 새로운 골캡슐을 보냈습니다. '${newParams.title}' 목표를 달성하여 캡슐을 열어보세요!</p>
          <p>지금부터 목표기간 동안 달성여부를 기록하면 최종 목표 달성 후 캡슐을 열 수 있습니다. 화이팅!</p>
          <p>감사합니다,<br/>ThreeIdiots 팀</p>
        </div>
        `;
        sendEmail(to, subject, html);
      }

      return newCapsule;
    } catch (error) {
      logger.error('goalCapsuleService createCapsule error', error);
      return new Promise((resolve, reject) => {
        reject(error);
      });
    } 
  },

  async getOneCapsule(params) {
    logger.info('goalCapsuleService getOneCapsule', params);
    try {
      const oneCapsule = await GoalCapsuleDao.selectOne(params);
      console.log("🚀 ~ getOneCapsule ~ oneCapsule.userId:", oneCapsule.userId)
      console.log("🚀 ~ getOneCapsule ~ req.user.id:", params.userId)
      console.log("🚀 ~ getOneCapsule ~ req.user.role:", params.userRole)
      if((oneCapsule.userId !== params.userId) && (oneCapsule.otherId !== params.userId) && params.userRole !== 'admin') {
        throw new Error({message: 'Authorization'});
      }
      return oneCapsule;
    } catch (error) {
      logger.error('goalCapsuleService getOneCapsule error', error);
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },

  async getAllByUserIdCapsule(params) {
    logger.info('goalCapsuleService getAllByUserIdCapsule', params);
    try {
      const oneCapsule = await GoalCapsuleDao.selectAllByUserId(params);
      return oneCapsule;
    } catch (error) {
      logger.error('goalCapsuleService getAllByUserIdCapsule error', error);
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },

  async getAllCapsule() {
    logger.info('goalCapsuleService getAllCapsule');
    try {
      const allCapsule = await GoalCapsuleDao.selectAll();
      return allCapsule;
    } catch (error) {
      logger.error('goalCapsuleService getAllCapsule error', error);
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },

  async updateCapsule(params) {
    logger.info('goalCapsuleService updateCapsule', params);
    try {
      const oneCapsule = await GoalCapsuleDao.selectOne(params);
      console.log("🚀 ~ updateCapsule ~ oneCapsule.userId:", oneCapsule.userId)
      console.log("🚀 ~ updateCapsule ~ req.user.id:", params.userId)
      console.log("🚀 ~ updateCapsule ~ req.user.role:", params.userRole)
      if((oneCapsule.userId !== params.userId) && (oneCapsule.otherId !== params.userId) && params.userRole !== 'admin') {
        throw new Error({message: 'Authorization'});
      }
      const updatedCapsule = await GoalCapsuleDao.update(params);
      if (updatedCapsule.nowCount === updatedCapsule.goalCount) {
        const newUpdatedCapsule = await GoalCapsuleDao.update({id : params.id, isSuccess: true});
        logger.info('goalCapsuleService newUpdatedCapsule', newUpdatedCapsule);
        return newUpdatedCapsule;
      }
      return updatedCapsule;
    } catch (error) {
      logger.error('goalCapsuleService updateCapsule error', error);
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },

  async deleteCapsule(params) {
    logger.info('goalCapsuleService deleteCapsule', params);
    try {
      const oneCapsule = await GoalCapsuleDao.selectOne(params);
      console.log("🚀 ~ deleteCapsule ~ oneCapsule.userId:", oneCapsule.userId)
      console.log("🚀 ~ deleteCapsule ~ req.user.id:", params.userId)
      console.log("🚀 ~ deleteCapsule ~ req.user.role:", params.userRole)
      if((oneCapsule.userId !== params.userId) && (oneCapsule.otherId !== params.userId) && params.userRole !== 'admin') {
        throw new Error({message: 'Authorization'});
      }
      const deletedCapsule = await GoalCapsuleDao.delete(params);
      return deletedCapsule;
    } catch (error) {
      logger.error('goalCapsuleService deleteCapsule error', error);
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }
}

export default goalCapsuleService;
