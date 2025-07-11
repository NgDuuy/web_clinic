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
module.exports = {
    getDoctorTop: getDoctorTop
}