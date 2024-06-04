import { Sequelize } from "sequelize";

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