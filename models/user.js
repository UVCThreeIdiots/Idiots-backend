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
      role: {
        type: Sequelize.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: 'user',
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
    User.hasMany(models.TCapsule, { foreignKey: 'userId', as: 'tCapsules', onDelete: "cascade" }, );
    User.hasMany(models.GCapsule, { foreignKey: 'userId', as: 'gCapsules', onDelete: "cascade" });
  }

  static getIncludeAttributes() {
    return ['id', 'userId', 'name', 'age', 'email','role','mode' ,'updatedAt', 'createdAt', 'deletedAt'];
  }
}

export default User;