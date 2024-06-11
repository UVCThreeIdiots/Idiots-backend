import { Sequelize } from "sequelize";

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
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      mode: {
        type: Sequelize.ENUM('normal', 'game'),
        allowNull: false,
        defaultValue: 'normal',
      }
    }, {
      sequelize,
      underscored: true, // true: underscored, false: camelCase
      timestamps: true, // createAt, updatedAt
      paranoid: true, // deletedAt
    });
  }

  static associate(models) {
    User.hasMany(models.TCapsule, { foreignKey: 'userId', as: 'tCapsules' });
    User.hasMany(models.GCapsule, { foreignKey: 'userId', as: 'gCapsules' });
  }

  static getIncludeAttributes() {
    return ['id', 'userId', 'password', 'name', 'age', 'email','admin','mode' ,'updatedAt', 'createdAt', 'deletedAt'];
  }
}

export default User;