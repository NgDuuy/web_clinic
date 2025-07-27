import { raw } from 'body-parser';
import db from '../models/index';
import emailSevice from './emailService'
require('dotenv').config();
const { reject } = require("lodash")

let postBookAppointmentService = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("Check check data: ", data)
            if (!data.email || !data.fullName || !data.doctorId || !data.timeType ||
                !data.date
            ) {
                resolve({
                    errCode: -1,
                    errMessage: "Missing required parameter"
                })
            } else {
                await emailSevice.sendSimpleEmail({
                    reciverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.nameDoctor,
                    language: data.language,
                    redirectLink: 'https://www.facebook.com/'

                })
                let user = await db.Users.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        password: 123456,
                        firstName: data.fullName,
                        lastName: data.fullName,
                        roleId: "R3"
                    },
                    raw: true
                });
                console.log("Check user: ", user)
                if (user && user[0]) {
                    console.log("Check data.doctorId: ", data.doctorId)
                    console.log("Check date: ", data.date)
                    console.log("Check data.timeType: ", data.timeType)
                    await db.bookings.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType
                        }
                    })
                }
                console.log("Check check data user && created: ", user[0])
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
module.exports = {
    postBookAppointmentService,
}