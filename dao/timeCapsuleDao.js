import TCapsule from '../models/timeCapsule.js';
import logger from '../lib/logger.js';
import User from '../models/user.js';

const timeCapsuleDao = {
  // 타임캡슐 등록
  insert(params) {
    logger.info('timeCapsule insert', params);
    return new Promise((resolve, reject) => {
      TCapsule.create(params)
      .then(result => {
        logger.info('timeCapsule insert result', result);
        resolve(result)
      })
      .catch(err => {
        logger.error('timeCapsule insert error', err);
        reject(err)
      })
    })
  },

  // 타임캡슐 조회
  // 1. 전체 조회
  async findAllTCapsules() {
    return await TCapsule.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: User.getIncludeAttributes(),
      }]
    });
    
  },
  // 2. user의 id값으로 특정 user 조회
  async findByIdTCapsule(params) {
    const setQuery = {};
    if (params.id) {
      setQuery.where = { id: params.id }; 
    }
    return await TCapsule.findOne({
      ...setQuery,
      include: [{
        model: User,
        as: 'user',
        attributes: User.getIncludeAttributes(),
      }]
    });
  },
  // 수정
  updateTCapsuleById(params) {
    return new Promise((resolve, reject) => {
      TCapsule.update(
        params,
        {
          where: { id: params.id },
        },
      ).then(() => {
        resolve('update success');
      }).catch((error) => {
        reject(error);
      })
    })
  },
  // 삭제
  deleteTCapsuleById(params){
    return new Promise((resolve, reject) => {
      TCapsule.destroy({
        where: { id: params.id },
      }).then(() => {
        resolve('delete success');
      }).catch((error) => {
        reject(error);
      })
    })
  }
}


export default timeCapsuleDao;