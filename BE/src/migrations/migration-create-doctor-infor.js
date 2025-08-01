'use trict';

const allCode = require('../models/allCode');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('doctor_Infor', {
            Id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            doctorId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            priceId: {
                type: Sequelize.STRING,
                allowNull: false
            },
            provinceId: {
                type: Sequelize.STRING,
                allowNull: false
            },
            paymentId: {
                type: Sequelize.STRING,
                allowNull: false
            },
            addressClinic: {
                type: Sequelize.STRING,
                allowNull: false
            },
            nameClinic: {
                type: Sequelize.STRING,
                allowNull: false
            },
            note: {
                type: Sequelize.STRING
            },
            count: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('doctor_Infor');
    }
}