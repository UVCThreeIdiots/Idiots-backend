import userDao from "../dao/userDao.js";


// // 사용자 인증 미들웨어
function isAuthenticated(req, res, next) {
  console.log("🚀 ~ isAuthenticated ~ isAuthenticated session :")
  // console.log("🚀 ~ isAuthenticated ~ isAuthenticated user :", req.user)
  // console.log("🚀 ~ isAuthenticated ~ isAuthenticated header :", req.headers)
  // console.log("🚀 ~ isAuthenticated ~ isAuthenticated body :", req.body)
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

function isAuthorization(req, res, next) {
  // console.log("🚀 ~ isAuthorization ~ isAuthorization user :", req.user)
  userDao.selectUser({id: req.user.id}).then((user) => {
    if (user.role === 'admin') {
      return next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }).catch((error) => {
    throw new Error(error.message);
  });
}

export { isAuthenticated, isAuthorization }
