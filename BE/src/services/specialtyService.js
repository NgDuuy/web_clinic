import db from '../models/index';
let createNewSpecialtyService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter"
                })
            }
            else {
                await db.specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                resolve({
                    errCode: 0,
                    errMessage: "Create a new specialty success"
                })
            }
        }
        catch (e) {
            reject(e)
        }
    })
}
let getAllSpecialtyService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.specialty.findAll({
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
let getDetailSpecialtyByIdService = (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId || !location) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter"
                })
            }
            else {
                let data = await db.specialty.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['descriptionHTML', 'descriptionMarkdown']
                })
                if (data) {
                    let doctorSpecialty = [];
                    if (location === 'All') {
                        doctorSpecialty = await db.doctor_Infor.findAll({
                            where: { specialtyId: inputId },
                            attributes: ['doctorId', 'provinceId']
                        })
                    } else {
                        doctorSpecialty = await db.doctor_Infor.findAll({
                            where: {
                                specialtyId: inputId,
                                provinceId: location
                            },
                            attributes: ['doctorId', 'provinceId']
                        })
                    }
                    data.doctorSpecialty = doctorSpecialty;
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
    createNewSpecialtyService,
    getAllSpecialtyService, getDetailSpecialtyByIdService
}