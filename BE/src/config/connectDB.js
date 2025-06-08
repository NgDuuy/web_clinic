const { Sequelize } = require('../models');

const sequelize = new Sequelize('project', 'root', '2210510', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
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