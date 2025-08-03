import db from '../models/index';
let createNewClinicService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown || !data.address) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter"
                })
            }
            else {
                await db.clinics.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                    address: data.address
                })
                resolve({
                    errCode: 0,
                    errMessage: "Create a new clinic success"
                })
            }
        }
        catch (e) {
            reject(e)
        }
    })
}


let getAllClinicService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.clinics.findAll({
                raw: true
            });
            if (data && data.length > 0) {
                data = data.map(item => {
                    if (item.image) { item.image = new Buffer(item.image, 'base64').toString('binary'); }
                    return item
                })
            }
            resolve({
                errCode: 0,
                data: data
            })
        }
        catch (e) {
            reject(e);
        }
    })
}
let getDetailClinicByIdService = (inputId) => {

    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter"
                })
            }
            else {
                let data = await db.clinics.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['name', 'address', 'descriptionHTML', 'descriptionMarkdown']
                })
                if (data) {
                    let doctorClinic = [];
                    doctorClinic = await db.doctor_Infor.findAll({
                        where: {
                            clinicId: inputId
                        },
                        attributes: ['doctorId', 'provinceId']
                    })
                    data.doctorClinic = doctorClinic;
                } else {
                    data: { }
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
module.exports = {
    createNewClinicService, getAllClinicService,
    getDetailClinicByIdService
}