import { raw } from 'body-parser';
import db from '../models/index';
import emailSevice from './emailService'
import { v4 as uuidv4 } from 'uuid'
import { config } from 'dotenv';
import { where } from 'sequelize';
require('dotenv').config();
const { reject } = require("lodash")
let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verifyl-booking?token=${token}&doctorId=${doctorId}`
    return result
}
let postBookAppointmentService = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.fullName || !data.doctorId || !data.timeType ||
                !data.date || !data.selectedGender || !data.address
            ) {
                resolve({
                    errCode: -1,
                    errMessage: "Missing required parameter"
                })
            } else {
                let token = uuidv4();
                await emailSevice.sendSimpleEmail({
                    reciverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.nameDoctor,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId, token)

                })
                let user = await db.Users.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        password: 123456,
                        firstName: data.fullName,
                        lastName: data.fullName,
                        roleId: "R3",
                        address: data.address,
                        gender: data.selectedGender,
                        phoneNumber: data.phoneNumber
                    },
                    raw: true
                });
                console.log("Check user: ", user)
                if (user && user[0]) {
                    await db.bookings.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token,
                        }
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: "Save user success"
                })
            }

        }
        catch (e) {
            reject(e);
        }
    })
}
let postVerifyBookAppointmentService = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter"
                })
            }
            else {
                let appointment = await db.bookings.findOne({
                    where: {
                        token: data.token,
                        doctorId: data.doctorId,
                        statusId: 'S1'
                    },
                    raw: false
                })
                if (appointment) {
                    appointment.statusId = 'S2';
                    await appointment.save();
                    resolve({
                        errCode: 0,
                        errMessage: "Update appointment success"
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: "Appointment has been activated or does not exist"
                    })
                }

            }
        }
        catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    postBookAppointmentService, postVerifyBookAppointmentService
}