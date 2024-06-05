import GCapsule from '../models/goalCapsule.js';
import logger from '../lib/logger.js';
import User from '../models/user.js';

const GoalCapsuleDao = {
  // 캡슐 삽입
  insert(params) {
    logger.info('goalCapsuleDao insert', params);
    return new Promise((resolve, reject) => {
      GCapsule.create(params)
      .then(result => {
        logger.info('goalCapsuleDao insert result', result);
        resolve(result);
      })
      .catch(err => {
        logger.error('goalCapsuleDao insert error', err);
        reject(err)
      })
    })
  },

  // 캡슐 한개 조회
  selectOne(params) {
    logger.info('goalCapsuleDao selectOne', params);
    return new Promise((resolve, reject) => {
      GCapsule.findOne({
        attributes: [
          'id',
          'userId',
          'title',
          'body',
          'expired',
          'goalCount',
          'goalTerm',
          'nowCount',
          'dailyCheck',
          'isFailed',
          'isSuccess',
          'createdAt',
          'updatedAt',
          'deletedAt',
        ],
        include: [{
          model: User,
          as: 'user',
          attributes: User.getIncludeAttributes(),
        }],
        where: { id: params.id },
      }).then((selectedOne) => {
        logger.info('goalCapsuleDao selectOne result', selectedOne);
        resolve(selectedOne);
      }).catch((err) => {
        logger.error('goalCapsuleDao selectOne error', err);
        reject(err);
      });
    });
  },

  // 캡슐 전체 조회
  selectAll() {
    logger.info('goalCapsuleDao selectAll');
    return new Promise((resolve, reject) => {
      GCapsule.findAll({
        attributes: [
          'id',
          'userId',
          'title',
          'body',
          'expired',
          'goalCount',
          'goalTerm',
          'nowCount',
          'dailyCheck',
          'isFailed',
          'isSuccess',
          'createdAt',
          'updatedAt',
          'deletedAt',
        ],
          include: [{
            model: User,
            as: 'user',
            attributes: User.getIncludeAttributes(),
          }],
      }).then((selectedAll) => {
        logger.info('goalCapsuleDao selectAll result');
        resolve(selectedAll);
      }).catch((err) => {
        logger.error('goalCapsuleDao selectAll error', err);
        reject(err);
      });
    });
  },


  // 캡슐 수정
  update(params) {
    logger.info('goalCapsuleDao update', params);
    return new Promise((resolve, reject) => {
      GCapsule.update(
        params,
        { returning: true,
          where: { id: params.id },
        },
      ).then(([ updatedCount, updatedContent ]) => {
        logger.info('goalCapsuleDao update result', updatedCount, updatedContent);
        resolve( updatedContent[0] );
      }).catch((err) => {
        logger.error('goalCapsuleDao update error', err);
        reject(err);
      });
    });
  },
  // 캡슐 삭제
  delete(params) {
    logger.info('goalCapsuleDao delete', params);
    return new Promise((resolve, reject) => {
      GCapsule.destroy({
        where: { id: params.id },
      }).then((deleted) => {
        logger.info('goalCapsuleDao delete result', deleted);
        resolve({ deletedCount: deleted });
      }).catch((err) => {
        logger.error('goalCapsuleDao delete error', err);
        reject(err);
      });
    });
  },

}

export default GoalCapsuleDao;

// ['title', 'body', 'expired', 'goalCount', 'numInterval', 'goalReps', 'nowCount', 'isFailed', 'isSuccess']