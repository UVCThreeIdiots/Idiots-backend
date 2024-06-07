import logger from '../lib/logger.js';
import userDao from '../dao/userDao.js'; 
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
}

export default otherService;