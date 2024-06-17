import GCapsule from '../models/goalCapsule.js';
import TCapsule from '../models/timeCapsule.js';
import logger from '../lib/logger.js';
import User from '../models/user.js';
import { Op } from 'sequelize';

const capsuleDao = {

  // 완료된 캡슐 내꺼 전체 조회
  selectAllByMyId(params) {
    logger.info('capsuleDao selectAllByMyId');
    return new Promise((resolve, reject) => {
      const gCapsulePromise = GCapsule.findAll({
        include: [{
          model: User,
          as: 'user',
          attributes: User.getIncludeAttributes(),
        }],
        where: {
          [Op.or]: [
            {
              userId: params.userId,
              [Op.or]: [
                { isSuccess: true },
                { isFailed: true },
              ],
              otherEmail: '', // otherEmail이 빈 값인 경우
            },
            {
              otherId: params.userId
            }
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
          [Op.or]: [
            {
              userId: params.userId,
              status: true,
              otherEmail: '',
            },
            {
              status: true,
              otherId: params.userId
            }
          ]
        },
      });
  
      Promise.all([gCapsulePromise, tCapsulePromise])
        .then(([gCapsules, tCapsules]) => {
          logger.info('capsuleDao selectAllByMyId result');
          resolve({ gCapsules, tCapsules });
        })
        .catch((err) => {
          logger.error('capsuleDao selectAllByMyId error', err);
          reject(err);
        });
    });
  },

  // 내가 타인에게 보낸 캡슐 전체 조회
  selectAllByOtherId(params) {
    logger.info('capsuleDao selectAllByOtherId');
    return new Promise((resolve, reject) => {
      const gCapsulePromise = GCapsule.findAll({
        include: [{
          model: User,
          as: 'user',
          attributes: User.getIncludeAttributes(),
        }],
        where: {
          userId: params.userId,
          otherEmail: { [Op.ne]: '' }, // otherEmail이 빈 값이 아닌 경우
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
          // status: true,
          otherEmail: { [Op.ne]: '' }, // otherEmail이 빈 값이 아닌 경우
        },
      });
  
      Promise.all([gCapsulePromise, tCapsulePromise])
        .then(([gCapsules, tCapsules]) => {
          logger.info('capsuleDao selectAllByOtherId result');
          resolve({ gCapsules, tCapsules });
        })
        .catch((err) => {
          logger.error('capsuleDao selectAllByOtherId error', err);
          reject(err);
        });
    });
  },
  // 가입시 타인이 나에게 보낸 캡슐 전체 조회
  selectAllByEmailWhenRegister(params) {
    logger.info('capsuleDao selectAllByEmailWhenRegister');
    return new Promise((resolve, reject) => {
      const gCapsulePromise = GCapsule.findAll({
        include: [{
          model: User,
          as: 'user',
          attributes: User.getIncludeAttributes(),
        }],
        where: {
          otherEmail: params.email
        },
      });
  
      const tCapsulePromise = TCapsule.findAll({
        include: [{
          model: User,
          as: 'user',
          attributes: User.getIncludeAttributes(),
        }],
        where: {
          otherEmail: params.email          // status: true,
        },
      });
  
      Promise.all([gCapsulePromise, tCapsulePromise])
        .then(([gCapsules, tCapsules]) => {
          logger.info('capsuleDao selectAllByEmailWhenRegister result');
          resolve({ gCapsules, tCapsules });
        })
        .catch((err) => {
          logger.error('capsuleDao selectAllByEmailWhenRegister error', err);
          reject(err);
        });
    });
  },

  // 관리자 권한 모든캡슐 조회
  selectAll() {
    logger.info('capsuleDao selectAll');
    return new Promise((resolve, reject) => {
      const gCapsulePromise = GCapsule.findAll({
        include: [{
          model: User,
          as: 'user',
          attributes: User.getIncludeAttributes(),
        }],
      });
  
      const tCapsulePromise = TCapsule.findAll({
        include: [{
          model: User,
          as: 'user',
          attributes: User.getIncludeAttributes(),
        }],
      });
  
      Promise.all([gCapsulePromise, tCapsulePromise])
        .then(([gCapsules, tCapsules]) => {
          logger.info('capsuleDao selectAll result');
          resolve({ gCapsules, tCapsules });
        })
        .catch((err) => {
          logger.error('capsuleDao selectAll error', err);
          reject(err);
        });
    });
  },

}

export default capsuleDao;

