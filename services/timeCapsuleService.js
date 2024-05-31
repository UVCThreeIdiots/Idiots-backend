import TimeCapsuleDao from '../dao/timeCapsuleDao.js';

const timeCapsuleService = {
  async createCapsule(params) {
    try {
      const newCapsule = await TimeCapsuleDao.insert(params);
      return newCapsule;
    } catch (error) {
      console.log('이 에러가 발생함 : ' , error);
    } 
  }
}

export default timeCapsuleService;