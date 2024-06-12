import logger from '../lib/logger.js';
import capsuleDao from '../dao/capsuleDao.js';

const capsuleService = {

  async getAllByIdCapsule(params) {
    logger.info('capsuleService getAllByIdCapsule', params);
    try {
      const allCapsule = await capsuleDao.selectAllByMyId(params);
      return allCapsule;
    } catch (error) {
      logger.error('capsuleService getAllByIdCapsule error', error);
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },

  async getAllForAdmin(params) {
    logger.info('capsuleService getAllForAdmin', params);
    try {
      const allCapsule = await capsuleDao.selectAll(params);
      return allCapsule;
    } catch (error) {
      logger.error('capsuleService getAllForAdmin error', error);
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },
}

export default capsuleService;