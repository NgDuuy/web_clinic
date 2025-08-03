import emailService from './emailService'
const { raw } = require("body-parser");
const db = require("../models");
const { Model, where } = require("sequelize");
const moment = require('moment');
const { reject, includes, castArray } = require("lodash");
require('dotenv').config()
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
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
let checkRequiredFields = (inputData) => {
    let array = ['doctorId', 'contentHTML', 'contentMarkdown',
        'selectedPrice', 'selectedPayment', 'selectedProvince', 'nameClinic',
        'addressClinic', 'note', 'specialtyId']
    let isValid = true;
    let element = '';
    for (let i = 0; i < array.length; i++) {
        if (!inputData[array[i]]) {
            isValid = false;
            element = array[i];
            break;
        }
    }
    return {
        isValid: isValid,
        element: element
    }
}
let saveInforDoctorService = (inputData) => {
    console.log("Check inputdata: ", inputData)
    return new Promise(async (resolve, reject) => {
        try {
            let checkObject = checkRequiredFields(inputData);

            if (checkObject.isValid === false) {
                resolve({
                    errCode: -1,
                    errMessage: `Missing parameter: ${checkObject.element}`
                })
                return
            } else {
                //upsert to markdown
                if (inputData.action === 'CREATE') {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId
                    })
                }
                else if (inputData.action === 'EDIT') {
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: { doctorId: inputData.doctorId },
                        raw: false
                    })
                    if (doctorMarkdown) {
                        doctorMarkdown.contentHTML = inputData.contentHTML,
                            doctorMarkdown.contentMarkdown = inputData.contentMarkdown,
                            doctorMarkdown.description = inputData.description,
                            doctorMarkdown.updateAt = new Date(),
                            await doctorMarkdown.save()
                    }

                }
            }
            //upsert to doctor_info table
            let doctorInfor = await db.doctor_Infor.findOne({
                where: {
                    doctorId: inputData.doctorId
                },
                raw: false
            })
            if (doctorInfor) {
                console.log("In update: ")
                doctorInfor.priceId = inputData.selectedPrice,
                    doctorInfor.provinceId = inputData.selectedProvince,
                    doctorInfor.paymentId = inputData.selectedPayment,
                    doctorInfor.nameClinic = inputData.nameClinic,
                    doctorInfor.addressClinic = inputData.addressClinic,
                    doctorInfor.note = inputData.note,
                    doctorInfor.specialtyId = inputData.specialtyId,
                    doctorInfor.clinicId = inputData.clinicId
                await doctorInfor.save()
            } else {
                //create
                console.log("In create: ")
                await db.doctor_Infor.create({
                    doctorId: inputData.doctorId,
                    priceId: inputData.selectedPrice,
                    provinceId: inputData.selectedProvince,
                    paymentId: inputData.selectedPayment,
                    nameClinic: inputData.nameClinic,
                    addressClinic: inputData.addressClinic,
                    note: inputData.note,
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
            console.log("check e: ", e)
            reject(e);
        }
    })
}
let getDetailDoctorByIdService = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                console.log('Error in if getDetailDosctorByIdService1: ')
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
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                        {
                            model: db.doctor_Infor,
                            attributes: {
                                exclude: ['id', 'doctorId']
                            },
                            include: [
                                { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] }
                            ]
                        },
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
let checkExist = async (inputData) => {
    if (!Array.isArray(inputData) || inputData.length === 0) {
        return [];
    }
    let conflicted = [];
    for (let item of inputData) {
        let existing = await db.schedules.findOne({
            where: {
                date: item.date,
                timeType: item.timeType,
                doctorId: item.doctorId
            }
        })
        if (!existing) {
            conflicted.push(item)
        }

    }
    return conflicted;
}
let postBulkCreateScheduleService = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let conflictedSchedule = await checkExist(inputData);
            if (conflictedSchedule.length === 0) {
                resolve({
                    errCode: -1,
                    errMessage: "One or more schedules already exist. Please choose different time",
                    conflicted: conflictedSchedule
                })
            }
            else {
                if (conflictedSchedule && conflictedSchedule.length > 0) {
                    conflictedSchedule = conflictedSchedule.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE
                        return item;
                    })
                }
                await db.schedules.bulkCreate(conflictedSchedule);
                resolve({
                    errCode: 0,
                    message: 'Saved successfully'
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let getScheduleByDateSevice = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: -1,
                    errMessage: "Missing required parameter"
                })
            } else {
                let data = await db.schedules.findAll({
                    where: { doctorId: doctorId, date: date },
                    include: [
                        { model: db.Allcode, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Users, as: 'doctorData', attributes: ['firstName', 'lastName'] },

                    ],
                    raw: false,
                    rest: true
                })
                if (!data) {
                    data = []
                }
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        }
        catch (e) {
            reject(e)
        }
    })
}
let getExtraDoctorByIdService = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errCode: -1,
                    errMessage: "Missing required parameter"
                })
            }
            else {
                let data = await db.doctor_Infor.findOne({
                    where: { doctorId: doctorId },
                    attributes: {
                        exclude: ['id', 'doctorId']
                    },
                    include: [
                        { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] }
                    ],
                    raw: false,
                    rest: true
                })
                if (!data) {
                    data = {}
                }
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
let getProfileDoctorByIdService = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errCode: -1,
                    errMessage: "Missing required parameter"
                })
            }
            else {
                let data = await db.Users.findOne({
                    where: { id: doctorId },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description']
                        },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                        {
                            model: db.doctor_Infor,
                            attributes: {
                                exclude: ['id', 'doctorId']
                            },
                            include: [
                                { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] }
                            ]
                        },
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
            reject(e);
        }
    })
}
let getGetListPatientForDoctorService = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter"
                })
            }
            else {
                let data = await db.bookings.findAll({
                    where: {
                        doctorId: doctorId,
                        statusId: 'S2',
                        date: date
                    },
                    include: [
                        {
                            model: db.Users,
                            as: 'patientData',
                            attributes: ['email', 'firstName', 'address', 'gender'],
                            include: [
                                {
                                    model: db.Allcode,
                                    as: 'genderData',
                                    attributes: ['valueEn', 'valueVi']
                                }
                            ]
                        },
                        {
                            model: db.Allcode,
                            as: 'timeTypeDataPatient',
                            attributes: ['valueEn', 'valueVi']
                        }
                    ],
                    raw: false,
                    nest: true
                });

                resolve({
                    errCode: 0,
                    data: data
                })
            }
        }
        catch (e) {
            reject(e)
        }
    })
}
let sendRemedyService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.patientId || !data.timeType) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter"
                })
            } else {
                //update patient Status
                let appointment = await db.bookings.findOne({
                    where: {
                        doctorId: data.doctorId,
                        patientId: data.patientId,
                        statusID: "S2",
                        timeType: data.timeType
                    },
                    raw: false
                })
                if (appointment) {
                    appointment.statusId = "S3"
                    await appointment.save()
                }

                await emailService.sendAttachment(data)
                resolve({
                    errCode: 0,
                    errMessage: "Send remedy success"
                })
            }

        }
        catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getDoctorTopService: getDoctorTopService,
    getAllDoctorService: getAllDoctorService,
    saveInforDoctorService: saveInforDoctorService,
    getDetailDoctorByIdService: getDetailDoctorByIdService,
    postBulkCreateScheduleService: postBulkCreateScheduleService,
    getScheduleByDateSevice, getExtraDoctorByIdService,
    getProfileDoctorByIdService: getProfileDoctorByIdService, getGetListPatientForDoctorService,
    sendRemedyService
}