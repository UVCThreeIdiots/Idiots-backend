import  User  from '../models/user.js';
import logger from '../lib/logger.js';
import GCapsule from '../models/goalCapsule.js';



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
        attributes: ['id', 'userId', 'password', 'name', 'age', 'email','updatedAt', 'createdAt', 'deletedAt'],
        include: [
          {
            model: GCapsule,
            as: 'gCapsules',
            attributes: GCapsule.getIncludeAttributes()
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
  
  selectAll() {
    logger.info('userDao selectAll');
    return new Promise((resolve, reject) => {
      User.findAll({
        attributes: ['id', 'userId', 'password', 'name', 'age', 'email', 'updatedAt', 'createdAt', 'deletedAt'],
        include: [
          {
            model: GCapsule,
            as: 'gCapsules',
            attributes: GCapsule.getIncludeAttributesId()
          }
        ],
      }).then((selectedAll) => {
        logger.info('userDao selectAll result', selectedAll);
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
          where: { id: params.id },
        },
      ).then(([updated]) => {
        logger.info('userDao update result', updated);
        resolve({ updatedCount: updated });
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