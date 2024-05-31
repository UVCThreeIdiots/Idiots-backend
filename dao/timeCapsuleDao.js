import TCapsule from '../models/timeCapsule.js';
import logger from '../lib/logger.js';

const timeCapsuleDao = {
  // 타임캡슐 등록
  insert(params) {
    return new Promise((resolve, reject) => {
      TCapsule.create(params)
      .then(result => resolve(result))
      .catch(err => reject(err))
    })
  },

  // 타임캡슐 조회
  // 1. 전체 조회
  async findAllTCapsules() {
    return await TCapsule.findAll();
  },
  
  // 2. user의 id값으로 특정 user 조회
  // 나중에 바꿔보기..
  findByIdTCapsule(params) {
    const setQuery = {};
    if (params.id) {
      setQuery.where = { id: params.id }; 
    }
    return TCapsule.findOne(setQuery);
  },

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