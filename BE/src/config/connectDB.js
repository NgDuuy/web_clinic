const { Sequelize } = require('../models');
require('dotenv').config()
const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT || 3306,
    logging: false,
    query: {
        "raw": true
    },
    timezone: "+07:00"
});
let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
module.exports = connectDB;