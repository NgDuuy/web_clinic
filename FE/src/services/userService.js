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
export {
    handleLoginApi, getAllUsers, createNewUserService,
    editUserInfo, deleteUser, getAllCodeService, getAllDoctorTop,
    getAllDoctor, saveDetailDoctorSevice,
    getDetailInforService
};
