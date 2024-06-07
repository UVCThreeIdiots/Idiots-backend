import logger from '../lib/logger.js';
import userDao from '../dao/userDao.js'; 
import capsuleDao from '../dao/capsuleDao.js';
const otherService = {

  async checkExistEmail(params) {
    logger.info('otherService checkExistEmail', params);
    try {
      const isExist = await userDao.selectUserByEmail(params);
      return isExist;
    } catch (error) {
      logger.error('otherService checkExistEmail error', error);
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },

  async getOtherCapsules(params) {
    logger.info('otherService getOtherCapsules', params);
    try {
      const allCapsule = await capsuleDao.selectAllByOtherId(params);

      
      return allCapsule;
    } catch (error) {
      logger.error('otherService getOtherCapsules error', error);
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },

  
}

export default otherService;