import userDao from '../dao/userDao.js';
import hashUtil from '../lib/hashUtil.js';
import logger from '../lib/logger.js';
import capsuleDao from '../dao/capsuleDao.js';
import GoalCapsuleDao from '../dao/goalCapsuleDao.js';
import timeCapsuleDao from '../dao/timeCapsuleDao.js';
import crypto from 'crypto';
import { sendVerificationEmail } from '../config/email.js';
import { setVerifyToken, checkVerifyToken} from '../lib/token.js';


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
      const allCapsules = await capsuleDao.selectAllByEmailWhenRegister({email: insert.email});
      // allCapsules는 otherEmail에 내 이메일이 있는것을 다 불러옴
      // 이제 얘네들 otherId에 내 ID(PK)값을 다 넣어줄거임 여기서
      // 골캡슐이면 골다오에 update로 보내고 타임캡슐이면 타임다오에 update로 보내서 otherId없데이트
      // 이건 그냥 await 안해도 될듯 비동기로 처리하고 얼른 가입한거 응답 보내줘야되니까
      allCapsules.gCapsules.forEach(capsule => {
        GoalCapsuleDao.update({id: capsule.id, otherId: insert.id})
      });
      allCapsules.tCapsules.forEach(capsule => {
        timeCapsuleDao.updateTCapsuleById({id: capsule.id, otherId: insert.id})
      }); 
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
    let newParams = null;
    
    if( params.password ){
      try{
        newHashPassword = await hashUtil.makeHashPassword(params.password);
      } catch (error) {
        return new Promise((resolve, reject) => {
          logger.error('userService reg hashPassword error', error);
          reject(error);
        });
      }
  
      newParams = {
        ...params, 
        password: newHashPassword,
      };
    }
    try {
      const updatedUser = await userDao.update(newParams ? newParams : params);
      return updatedUser;
    } catch (error) {
      logger.error('userService updateUser error', error);
      return new Promise((resolve, reject) => {
        reject(error);
      });
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
  },



  async infoPasswordCheck(params) {
    let user = null;
    try {
      user = await userDao.selectUser(params);
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
        return false;
      } else {
        return true
      }
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
  },



  async checkDuplicate(params) {
    let user = null;
    try {
      user = await userDao.loginUser(params);
      if (!user) {
        return new Promise((resolve, reject) => {
          resolve('true');
        })
        
      } else {
        return new Promise((resolve, reject) => {
          resolve('false');
        })
      }
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

  },

  async verificationEmail(params) {
    logger.info('userService verificationEmail', params);
    try {
      const isExist = await userDao.selectUserByEmail(params);
      if (isExist) {
        return('false');
      }
    } catch (error) {
      logger.error('userService verificationEmail error', error);
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    const token = crypto.randomBytes(3).toString('hex').toUpperCase(); // 랜덤값 생성
    console.log("🚀 ~ verificationEmail ~ token:", token)
    const to = params.email;
    const subject = 'Idiots Verification Email';
    const html = `
      <h1>Verification Email</h1>
      <p>Please enter the verify number : ${token}</p>
      
    `;
    try {

      await sendVerificationEmail(to, subject, html);
      setVerifyToken(to, 60, token) // 1분 동안 유효
      return new Promise((resolve, reject) => {
        resolve('true');
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },
  
  async verificationCode(params) {
    console.log("🚀 ~ verificationCode ~ params.email:", params.email)
    console.log("🚀 ~ verificationCode ~ params.code:", params.code)
    
    const userEmail = params.email;
    const token = params.code;
    const isValid = checkVerifyToken(userEmail, token)
    return new Promise((resolve, reject) => {
      resolve(isValid);
    });
  },

  


}

export default userService;