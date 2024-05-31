import CapsuleDao from '../dao/timeCapsuleDao.js';

const capsuleService = {
  async createCapsule(params) {
    try {
      const newCapsule = await CapsuleDao.insert(params);
      return newCapsule;
    } catch (error) {
      console.log('이 에러가 발생함 : ' , error);
    } 
  }
}

export default capsuleService;