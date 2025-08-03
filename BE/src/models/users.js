'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.belongsTo(models.Allcode, { foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData' })
      Users.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' })
      Users.hasOne(models.Markdown, { foreignKey: 'doctorId' });
      Users.hasOne(models.doctor_Infor, { foreignKey: 'doctorId' });
      Users.hasMany(models.schedules, { foreignKey: 'doctorId', as: 'doctorData' })
      Users.hasMany(models.bookings, { foreignKey: 'doctorId', as: 'patientData' })
    }
  }
  Users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.STRING,
    roleId: DataTypes.STRING,
    positionId: DataTypes.STRING,
    image: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'Users',
    freezeTableName: true,
    tableName: 'Users'
  });
  return Users;
};