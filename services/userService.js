import userDao from '../dao/userDao';
import hashUtil from '../lib/hashUtil.js';

const userService = {
  async reg(params){
    let hashPassword = null;

    try{
      hashPassword = await hashUtil.makeHashPassword(params.password);
    } catch (error) {
      console.error(error);
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    const newParams = {
      ...params, 
      password: hashPassword,
    };
    try {
      const insert = await userDao.insert(newParams);
      console.log(`이거 들어감 ==> ${JSON.stringify(insert)}`);
      return insert;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}