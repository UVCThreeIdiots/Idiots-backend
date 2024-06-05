import userDao from '../dao/userDao.js';
import hashUtil from '../lib/hashUtil.js';
import logger from '../lib/logger.js';

const userService = {
  async reg(params){
    logger.info('userService reg', params);

    let hashPassword = null;

    try{
      hashPassword = await hashUtil.makeHashPassword(params.password);
    } catch (error) {
      return new Promise((resolve, reject) => {
        logger.error('userService reg hashPassword error', error);
        reject(error);
      });
    }

    const newParams = {
      ...params, 
      password: hashPassword,
    };
    try {
      const insert = await userDao.insert(newParams);
      return insert;
    } catch (error) {
      logger.error('userService reg insert error', error);
      throw new Error(error);
    }
  },

  async list() {
    logger.info('userService list');
    let allUser = null;
    try {
      allUser = await userDao.selectAll();
      logger.info('userService list allUsers', allUser);
      
      if(!allUser) {
        const err = new Error('No user');
        return new Promise((resolve, reject) => {
          logger.error('userService list allUser is null');
          reject(err);
        });
      }
      return new Promise((resolve) => {
        resolve(allUser);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        logger.error('userService list error', error);
        reject(error);
      });
    }
  },

  async getOneUser(params) {
    logger.info('userService getOneUser', params);
    try {
      const oneCapsule = await userDao.selectUser(params);
      return oneCapsule;
    } catch (error) {
      logger.error('userService getOneUser error', error);
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },

  async updateUser(params) {
    logger.info('userService updateUser', params);

    let newHashPassword = null;

    if( params.password ){
      try{
        newHashPassword = await hashUtil.makeHashPassword(params.password);
      } catch (error) {
        return new Promise((resolve, reject) => {
          logger.error('userService reg hashPassword error', error);
          reject(error);
        });
      }
  
      const newParams = {
        ...params, 
        password: newHashPassword,
      };

      try {
        const updatedUser = await userDao.update(newParams);
        return updatedUser;
      } catch (error) {
        logger.error('userService updateUser error', error);
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }else {
      try {
        const updatedUser = await userDao.update(params);
        return updatedUser;
      } catch (error) {
        logger.error('userService updateUser error', error);
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }  
  },

  async deleteUser(params) {
    logger.info('userService deleteUser', params);
    try {
      const deletedUser = await userDao.delete(params);
      return deletedUser;
    } catch (error) {
      logger.error('userService deleteUser error', error);
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },

  async login(params) {
    let user = null;
    try {
      user = await userDao.loginUser(params);
      // 해당 사용자가 없는 경우 튕겨냄
      if (!user) {
        const err = new Error('Incorect userid');
        
        return new Promise((resolve, reject) => {
          reject(err);
        });
      }
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 2. 비밀번호 비교
    try {
      const checkPassword = await hashUtil.checkPasswordHash(params.password, user.password);

      // 비밀번호 틀린 경우 튕겨냄
      if (!checkPassword) {
        const err = new Error('Incorect password');

        return new Promise((resolve, reject) => {
          reject(err);
        });
      }
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(user);
    });
  }

  


}

export default userService;