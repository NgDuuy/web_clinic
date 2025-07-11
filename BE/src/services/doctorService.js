const { raw } = require("body-parser");
const db = require("../models");
const { Model } = require("sequelize");

let getDoctorTopService = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            limitInput = parseInt(limitInput);
            let users = await db.Users.findAll({
                limit: limitInput,
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                ],
                where: { roleId: 'R2' },
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: users
            })
        }
        catch (e) {
            console.log("Get doctor top service error: ", e);
            reject(e);
        }
    })
}
module.exports = {
    getDoctorTopService: getDoctorTopService
}