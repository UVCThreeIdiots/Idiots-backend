import { User } from ('../models/index.js');


const userDao = {
  insert(params) {
    return new Promise((resolve, reject) => {
      User.create(params).then((inserted) => {
        resolve(newInserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
}

export default userDao;