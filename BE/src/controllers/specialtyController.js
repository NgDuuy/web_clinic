import specialtyService from '../services/specialtyService'
let createNewSpecialty = async (req, res) => {
    try {
        let data = await specialtyService.createNewSpecialtyService(req.body);
        return res.status(200).json({ data })
    }
    catch (e) {
        console.log("Error in createNewSpecialty: ", e)
        return res.status(200).json({
            errCode: 1,
            errMessage: "Error from server..."
        })
    }
}
let getAllSpecialty = async (req, res) => {
    try {
        let data = await specialtyService.getAllSpecialtyService();
        return res.status(200).json({ data })
    }
    catch (e) {
        console.log("Error in getAllSpecialty: ", e)
        return res.status(200).json({
            errCode: 1,
            errMessage: "Error from server..."
        })
    }
}
let getDetailSpecialtyById = async (req, res) => {
    try {
        let data = await specialtyService.getDetailSpecialtyByIdService(req.query.doctorId, req.query.location);
        return res.status(200).json({ data })
    }
    catch (e) {
        console.log("Error in getDetailSpecialtyById: ", e)
        return res.status(200).json({
            errCode: 1,
            errMessage: "Error from server..."
        })
    }
}
module.exports = {
    createNewSpecialty, getAllSpecialty,
    getDetailSpecialtyById
}