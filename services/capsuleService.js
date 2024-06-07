import logger from '../lib/logger.js';
import capsuleDao from '../dao/capsuleDao.js';

const capsuleService = {

  async getAllByIdCapsule(params) {
    logger.info('getAllCapsule getAllCapsule', params);
    try {
      const allCapsule = await capsuleDao.selectAllByMyId(params);
      return allCapsule;
    } catch (error) {
      logger.error('capsuleService getAllCapsule error', error);
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },
}

export default capsuleService;