import { DataTypes, Sequelize } from "sequelize";
import User from './user.js';

class Capsule extends Sequelize.Model {
  static init(sequelize){
    return super.init({
      // userId: {
      //   type: DataTypes.INTEGER(),
      //   allowNull: false,
      // },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body:{
        type: DataTypes.TEXT(),
        allowNull: false,
      },
      expired: {
        type: DataTypes.DATE,
        // allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      }
    }, {
      sequelize,
      // modelName: 'capsule',
      timestamps: true,
      underscored: true, // true: underscored, false: camelCase
      createdAt: true,
      updatedAt: false
    });
  }
  static associate(models) {
    Capsule.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

export default Capsule;