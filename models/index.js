import sequelize from "./connection.js";
import User from "./user.js";
import TCapsule from './timeCapsule.js';

const db = {}

db.sequelize = sequelize;

db.User = User;
db.TCapsule = TCapsule;


User.init(sequelize);
TCapsule.init(sequelize);

User.associate(db);
TCapsule.associate(db);

export default db;