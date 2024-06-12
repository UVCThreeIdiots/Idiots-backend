import  User  from '../models/user.js';
import logger from '../lib/logger.js';
import GCapsule from '../models/goalCapsule.js';
import TCapsule from '../models/timeCapsule.js';



const userDao = {
  insert(params) {
    logger.info('userDao insert', params);
    return new Promise((resolve, reject) => {
      User.create(params).then((inserted) => {
        logger.info('userDao insert result', inserted);
        resolve(inserted);
      }).catch((err) => {
        logger.error('goalCapsuleDao insert error', err);
        reject(err);
      });
    });
  },
  
  selectUser(params) {
    logger.info('userDao selectUser', params);
    return new Promise((resolve, reject) => {
      User.findOne({
        attributes: ['id', 'userId', 'password', 'name', 'age', 'email','role', 'mode','updatedAt', 'createdAt', 'deletedAt'],
        include: [
          {
            model: GCapsule,
            as: 'gCapsules',
            attributes: GCapsule.getIncludeAttributes(),
          },{
            model: TCapsule,
            as: 'tCapsules',
            attributes: TCapsule.getIncludeAttributes(),
          },
        ],
        where: { id: params.id },
      }).then((selectedOne) => {
        logger.info('userDao selectUser result');
        resolve(selectedOne);
      }).catch((err) => {
        logger.error('userDao selectUser error', err);
        reject(err);
      });
    });
  },

  selectUserByEmail(params) {
    logger.info('userDao selectUserByEmail', params);
    return new Promise((resolve, reject) => {
      User.findOne({
        attributes: ['id', 'userId', 'name','email'],
        where: { email: params.email },
      }).then((selectedOne) => {
        logger.info('userDao selectUserByEmail result');
        resolve(selectedOne);
      }).catch((err) => {
        logger.error('userDao selectUserByEmail error', err);
        reject(err);
      });
    });
  },

  loginUser(params) {
    logger.info('userDao loginUser', params);
    return new Promise((resolve, reject) => {
      User.findOne({
        attributes: ['id', 'userId', 'password', 'name', 'age', 'email','role', 'mode','updatedAt', 'createdAt', 'deletedAt'],
        where: { userId: params.userId },
      }).then((selectedOne) => {
        logger.info('userDao loginUser result');
        resolve(selectedOne);
      }).catch((err) => {
        logger.error('userDao loginUser error', err);
        reject(err);
      });
    });
  },
  

  selectAll() {
    logger.info('userDao selectAll');
    return new Promise((resolve, reject) => {
      User.findAll({
        attributes: ['id', 'userId', 'password', 'name', 'age', 'email','role', 'mode', 'updatedAt', 'createdAt', 'deletedAt'],
        include: [
          {
            model: GCapsule,
            as: 'gCapsules',
            attributes: GCapsule.getIncludeAttributesId()
          }
        ],
      }).then((selectedAll) => {
        logger.info('userDao selectAll result');
        resolve(selectedAll);
      }).catch((err) => {
        logger.error('userDao selectAll error', err);
        reject(err);
      });
    });
  },

  update(params) {
    logger.info('userDao update', params);
    return new Promise((resolve, reject) => {
      User.update(
        params,
        {
          returning: true,
          where: { id: params.id },
        },
      ).then(([updatedCount, updatedContent]) => {
        logger.info('userDao update result', updatedContent, updatedCount);
        resolve( updatedContent[0]);
      }).catch((err) => {
        logger.error('userDao update error', err);
        reject(err);
      });
    });
  },

  delete(params) {
    logger.info('userDao delete', params);
    return new Promise((resolve, reject) => {
      User.destroy({
        where: { id: params.id },
      }).then((deleted) => {
        logger.info('userDao delete result', deleted);
        resolve({ deletedCount: deleted });
      }).catch((err) => {
        logger.error('userDao delete error', err);
        reject(err);
      });
    });
  },




}

export default userDao;