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
let postBulkCreateSchedule = async (req, res) => {
    try {
        let data = await doctorService.postBulkCreateScheduleService(req.body);
        if (data && data.errCode === 0) {
            return res.status(200).json(data);
        }
        else {
            return res.status(200).json(data)
        }
    } catch (e) {
        console.log("Post bulk create schedule error1: ", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let getScheduleByDate = async (req, res) => {
    try {
        console.log("Check check req.query.doctorId,req.query.date: ", req.query.doctorId, req.query.date)
        let data = await doctorService.getScheduleByDateSevice(req.query.doctorId, req.query.date);
        if (data && data.errCode === 0) {
            return res.status(200).json(data);
        }
        else {
            return res.status(200).json(data)
        }
    } catch (e) {
        console.log("Post bulk create schedule error1: ", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let getExtraDoctorById = async (req, res) => {
    try {
        let data = await doctorService.getExtraDoctorByIdService(req.query.doctorId);
        if (data && data.errCode === 0) {
            return res.status(200).json(data);
        }
        else {
            return res.status(200).json(data)
        }
    }
    catch (e) {
        console.log("getExtraDoctorById error1: ", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let getProfileDoctorById = async (req, res) => {
    try {
        let data = await doctorService.getProfileDoctorByIdService(req.query.doctorId);
        if (data && data.errCode === 0) {
            return res.status(200).json(data);
        }
        else {
            return res.status(200).json(data)
        }
    }
    catch (e) {
        console.log("getProfileDoctorById error1: ", e);
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
    getDetailDoctorById: getDetailDoctorById,
    postBulkCreateSchedule: postBulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraDoctorById: getExtraDoctorById,
    getProfileDoctorById
}