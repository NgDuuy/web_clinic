import doctorService from '../services/doctorService'
let getDoctorTop = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await doctorService.getDoctorTopService(limit);
        return res.status(200).json(response)
    }
    catch (e) {
        console.log("Get all doctor top error: ", res);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server..."
        })
    }
}
let getAllDoctor = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctorService()
        if (doctors) {
            return res.status(200).json(doctors)
        }
        else {
            return res.status(200).json({
                errCode: -1,
                errMessage: "Error "
            })
        }
    }
    catch (e) {
        console.log('Get all doctor error: ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server..."
        })
    }
}
let postInforDoctor = async (req, res) => {
    try {
        let data = await doctorService.saveInforDoctorService(req.body);
        console.log("post infor doctor: ", data);
        if (data && data.errCode === 0) {
            return res.status(200).json(data);
        }
        else {
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server...'
            })
        }
    } catch (e) {
        console.log("Post infor doctor error: ", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let getDetailDoctorById = async (req, res) => {
    try {
        let data = await doctorService.getDetailDoctorByIdService(req.query.id);
        if (data && data.errCode === 0) {
            return res.status(200).json(data);
        }
        else {
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server...'
            })
        }
    } catch (e) {
        console.log("Get detail doctor error1: ", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
module.exports = {
    getDoctorTop: getDoctorTop,
    getAllDoctor: getAllDoctor,
    postInforDoctor: postInforDoctor,
    getDetailDoctorById: getDetailDoctorById
}