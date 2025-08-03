import clinicService from '../services/clinicService'
let createNewClinic = async (req, res) => {
    try {
        let data = await clinicService.createNewClinicService(req.body);
        return res.status(200).json({ data })
    }
    catch (e) {
        console.log("Error in createNewClinic: ", e)
        return res.status(200).json({
            errCode: 1,
            errMessage: "Error from server..."
        })
    }
}

let getAllClinic = async (req, res) => {
    try {
        let data = await clinicService.getAllClinicService();
        return res.status(200).json({ data })
    }
    catch (e) {
        console.log("Error in getAllClinic: ", e)
        return res.status(200).json({
            errCode: 1,
            errMessage: "Error from server..."
        })
    }
}
let getDetailClinicById = async (req, res) => {
    try {
        let data = await clinicService.getDetailClinicByIdService(req.query.id);
        return res.status(200).json({ data })
    }
    catch (e) {
        console.log("Error in getDetailClinicById: ", e)
        return res.status(200).json({
            errCode: 1,
            errMessage: "Error from server..."
        })
    }
}
module.exports = {
    createNewClinic, getAllClinic, getDetailClinicById
}