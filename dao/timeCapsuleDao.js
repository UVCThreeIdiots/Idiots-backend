import TCapsule from '../models/timeCapsule.js';

const TimeCapsuleDao = {
  insert(params) {
    return new Promise((resolve, reject) => {
      TCapsule.create(params)
      .then(result => resolve(result))
      .catch(err => reject(err))
    })
  }
}

export default TimeCapsuleDao;