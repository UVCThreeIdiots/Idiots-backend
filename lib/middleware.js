import userDao from "../dao/userDao.js";


function isAuthorization(req, res, next) {
  console.log("🚀 ~ isAuthorization ~ isAuthorization user :")
  userDao.selectUser({id: req.params.id}).then((user) => {
    if (user.role === 'admin') {
      return next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }).catch((error) => {
    throw new Error(error.message);
  });
}

export { isAuthorization }