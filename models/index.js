import sequelize from "./connection.js";
import User from "./user.js";
import TCapsule from './timeCapsule.js';
import GCapsule from './goalCapsule.js';


const db = {}

db.sequelize = sequelize;

db.User = User;
db.TCapsule = TCapsule;
db.GCapsule = GCapsule;


User.init(sequelize);
TCapsule.init(sequelize);
GCapsule.init(sequelize);

User.associate(db);
TCapsule.associate(db);
GCapsule.associate(db);

export default db;