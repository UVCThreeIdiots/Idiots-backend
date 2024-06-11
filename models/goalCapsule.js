import { Sequelize } from "sequelize";

class GCapsule extends Sequelize.Model {
  static init(sequelize){
    return super.init({
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      body:{
        type: Sequelize.TEXT(),
        allowNull: true,
      },
      expired: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      goalCount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      goalTerm: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      nowCount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      dailyCheck: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      isFailed: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      isSuccess: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      otherId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      otherEmail: {
        type : Sequelize.STRING(255),
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
    GCapsule.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }

  static getIncludeAttributes() {
    return [
      'id',
      'userId',
      'title',
      'body',
      'expired',
      'goalCount',
      'goalTerm',
      'nowCount',
      'dailyCheck',
      'isFailed',
      'otherId',
      'otherEmail',
      'isSuccess',
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

export default GCapsule;