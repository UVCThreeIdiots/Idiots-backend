import Capsule from '../models/capsule.js';

const CapsuleDao = {
  insert(params) {
    return new Promise((resolve, reject) => {
      Capsule.create(params)
       .then(result => resolve(result))
       .catch(err => reject(err))
    })
  }
}

export default CapsuleDao;