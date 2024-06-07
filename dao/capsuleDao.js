import GCapsule from '../models/goalCapsule.js';
import TCapsule from '../models/timeCapsule.js';
import logger from '../lib/logger.js';
import User from '../models/user.js';
import { Op } from 'sequelize';

const capsuleDao = {

  // 캡슐 전체 조회
  selectAllById(params) {
    logger.info('capsuleDao selectAllById');
    return new Promise((resolve, reject) => {
      const gCapsulePromise = GCapsule.findAll({
        include: [{
          model: User,
          as: 'user',
          attributes: User.getIncludeAttributes(),
        }],
        where: {
          userId: params.userId,
          [Op.or]: [
            { isSuccess: true },
            { isFailed: true }
          ]
        },
      });
  
      const tCapsulePromise = TCapsule.findAll({
        include: [{
          model: User,
          as: 'user',
          attributes: User.getIncludeAttributes(),
        }],
        where: {
          userId: params.userId,
          status: true,
        },
      });
  
      Promise.all([gCapsulePromise, tCapsulePromise])
        .then(([gCapsules, tCapsules]) => {
          logger.info('goalCapsuleDao selectAll result');
          resolve({ gCapsules, tCapsules });
        })
        .catch((err) => {
          logger.error('goalCapsuleDao selectAll error', err);
          reject(err);
        });
    });
  },

}

export default capsuleDao;

