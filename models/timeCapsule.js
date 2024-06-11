import { DataTypes, Sequelize } from "sequelize";

class TCapsule extends Sequelize.Model {
  static init(sequelize){
    return super.init({
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      body:{
        type: Sequelize.TEXT(),
        allowNull: false,
      },
      expired: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      otherId: {
        type: Sequelize.INTEGER,
      },
      otherEmail: {
        type : Sequelize.STRING(255),
      },
      files: {
        type: Sequelize.STRING(255),
        allowNull: true,
      }
    }, {
      sequelize,
      timestamps: true,
      underscored: true, // true: underscored, false: camelCase
      createdAt: true,
      paranoid: true, // deletedAt
    });
  }
  static associate(models) {
    TCapsule.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }

  static getIncludeAttributes() {
    return [
      'id',
      'title',
      'body',
      'expired',
      'status',
      'otherId',
      'otherEmail',
      'files',
      'createdAt',
      'updatedAt',
      'deletedAt',
      ];
  }
  static getIncludeAttributesId() {
    return [
      'id',
      ];
  }
}


export default TCapsule;