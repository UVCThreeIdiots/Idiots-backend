import GoalCapsuleDao from '../dao/goalCapsuleDao.js';
import logger from '../lib/logger.js';
import time from '../lib/timeUtil.js';

const goalCapsuleService = {
  async createCapsule(params) {
    logger.info('goalCapsuleService createCapsule', params);
    try {
      const newExpired = time.changeFormat(params.expired)
      const newParams = {
        ...params,
        expired: newExpired
      }
      const newCapsule = await GoalCapsuleDao.insert(newParams);
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
      return oneCapsule;
    } catch (error) {
      logger.error('goalCapsuleService getOneCapsule error', error);
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
      const updatedCapsule = await GoalCapsuleDao.update(params);
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