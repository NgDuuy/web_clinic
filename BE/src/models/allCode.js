'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Allcode.hasMany(models.Users, { foreignKey: 'positionId', as: 'positionData' })
            Allcode.hasMany(models.Users, { foreignKey: 'gender', as: 'genderData' })
            Allcode.hasMany(models.schedules, { foreignKey: 'timeType', as: 'timeTypeData' })
        }
    }
    Allcode.init({
        keyMap: DataTypes.STRING,
        valueEn: DataTypes.STRING,
        valueVi: DataTypes.STRING,
        type: DataTypes.STRING

    }, {
        sequelize,
        modelName: 'Allcode',
        freezeTableName: true,
        tableName: 'Allcode',
    });
    return Allcode;
};