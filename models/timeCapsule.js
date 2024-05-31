import { DataTypes, Sequelize } from "sequelize";

class TCapsule extends Sequelize.Model {
  static init(sequelize){
    return super.init({
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body:{
        type: DataTypes.TEXT(),
        allowNull: false,
      },
      expired: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: true, // true: underscored, false: camelCase
      createdAt: true,
      updatedAt: false
    });
  }
  static associate(models) {
    TCapsule.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

export default TCapsule;