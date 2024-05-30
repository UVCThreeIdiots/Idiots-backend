import sequelize from "./connection.js";
import User from "./user.js";
import Capsule from './capsule.js';

const db = {}

db.sequelize = sequelize;

db.User = User;
db.Capsule = Capsule;


User.init(sequelize);
Capsule.init(sequelize);

User.associate(db);
Capsule.associate(db);

export default db;