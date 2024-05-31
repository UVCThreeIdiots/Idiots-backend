import { Sequelize } from "sequelize";

class GCapsule extends Sequelize.Model {
  static init(sequelize){
    return super.init({
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      tag: {
        type: Sequelize.ARRAY(Sequelize.STRING(50)),
        allowNull: false,
      },
      body:{
        type: Sequelize.TEXT(),
        allowNull: false,
      },
      expired: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      goalCount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      numInterval: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      goalReps: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      nowCount: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
      'title',
      'tag',
      'body',
      'expired',
      'goalCount',
      'numInterval',
      'goalReps',
      'nowCount',
      'isFailed',
      'isSuccess',
      'createdAt',
      'updatedAt',
      'deletedAt',
      'userId',
      ];
  }
  static getIncludeAttributesId() {
    return [
      'id',
      ];
  }
}

export default GCapsule;