import { Sequelize } from "sequelize";
import TCapsule from './timeCapsule.js';

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      userId: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        }
      },
    }, {
      sequelize,
      // modelName: 'user',
      underscored: true, // true: underscored, false: camelCase
      timestamps: true, // createAt, updatedAt
      paranoid: true, // deletedAt
    });
  }

  static associate(models) {
    User.hasMany(models.TCapsule, { foreignKey: 'userId', as: 'tcapsules' });
  }
}

export default User;