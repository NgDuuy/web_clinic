import axios from "axios";
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}
const getAllUsers = (inputId) => {
    // template string
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
const createNewUserService = (userData) => {
    console.log('Check data from service', userData)
    return axios.post('/api/create-new-user', userData)
}
const editUserInfo = (userData) => {
    console.log('Check data from userService in function editUserInfo', userData);
    return axios.put('/api/edit-user-info', userData);
}
const deleteUser = (userId) => {
    console.log('Check data from userService in function deleteUser', userId);
    return axios.delete('/api/delete-user', { data: { id: userId } });
}
const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}
const getAllDoctorTop = (limitInput) => {
    return axios.get(`/api/top-doctor-home?limit=${limitInput}`)
}
const getAllDoctor = () => {
    return axios.get('/api/get-all-doctor')
}
const saveDetailDoctorSevice = (data) => {
    return axios.post('/api/save-infor-doctor', data)
}
const getDetailInforService = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}
const postBulkCreateSchedule = (inputData) => {
    return axios.post('/api/bulk-create-schedule', inputData)
}
const getScheduleById = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`,)
}
const getExtraDoctorByIdService = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}
const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}
const postBookAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data)
}
const postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data)
}

const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data)
}
const getAllSpecialty = () => {
    return axios.get('/api/all-specialty')
}
const getDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?doctorId=${data.id}&location=${data.location}`)
}
const createNewClinic = (data) => {
    return axios.post('/api/create-new-clinic', data)
}
const getAllClinic = () => {
    return axios.get('/api/all-clinic')
}
const getDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}
const getGetListPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.id}&date=${data.date}`)
}
const sendRemedy = (data) => {
    return axios.post('/api/send-remedy', data)
}
export {
    handleLoginApi, getAllUsers, createNewUserService,
    editUserInfo, deleteUser, getAllCodeService, getAllDoctorTop,
    getAllDoctor, saveDetailDoctorSevice,
    getDetailInforService, postBulkCreateSchedule, getScheduleById,
    getExtraDoctorByIdService, getProfileDoctorById, postBookAppointment, postVerifyBookAppointment,
    createNewSpecialty, getAllSpecialty, getDetailSpecialtyById, createNewClinic, getAllClinic,
    getDetailClinicById, getGetListPatientForDoctor, sendRemedy
};
