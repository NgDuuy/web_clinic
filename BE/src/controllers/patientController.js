import patientService from '../services/patientSevice'
let postBookAppointment = async (req, res) => {
    try {
        console.log("")
        let data = await patientService.postBookAppointmentService(req.body)
        return res.status(200).json({ data })
    }
    catch (e) {
        console.log("Error postBookAppointment: ", e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server..."
        })
    }
}
module.exports = {
    postBookAppointment
}