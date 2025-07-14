const { raw } = require("body-parser");
const db = require("../models");
const { Model, where } = require("sequelize");

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
let getAllDoctorService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.Users.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                }
            })
            if (doctors) {
                resolve({
                    errCode: 0,
                    data: doctors
                });
            } else {
                reject(doctors)
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
let saveInforDoctorService = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(inputData.doctorId, inputData.contentHTML, inputData.contentMarkdown)
            if (!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown) {
                resolve({
                    errCode: -1,
                    errMessage: "Missing parameter"
                })
                return
            } else {
                await db.Markdown.create({
                    contentHTML: inputData.contentHTML,
                    contentMarkdown: inputData.contentMarkdown,
                    description: inputData.description,
                    doctorId: inputData.doctorId,
                    specialtyId: inputData.specialtyId,
                    clinicId: inputData.clinicId
                })
            }
            resolve({
                errCode: 0,
                errMessage: "Save infor doctor success!"
            })

        }
        catch (e) {
            reject(e);
        }
    })
}
let getDetailDoctorByIdService = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                console.log('Error in if getDetailDosctorByIdService: ')
                resolve({
                    errCode: -1,
                    errMessage: "Missing parameter"
                })
            }
            else {
                let data = await db.Users.findOne({
                    where: { id: inputId },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown']
                        },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] }
                    ],
                    raw: false,
                    nest: true
                })
                if (!data) {
                    data = {}
                }
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary')
                }
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        }
        catch (e) {
            console.log("In getDetailDoctorByIdService catch")
            reject(e)
        }
    })
}
module.exports = {
    getDoctorTopService: getDoctorTopService,
    getAllDoctorService: getAllDoctorService,
    saveInforDoctorService: saveInforDoctorService,
    getDetailDoctorByIdService: getDetailDoctorByIdService
}