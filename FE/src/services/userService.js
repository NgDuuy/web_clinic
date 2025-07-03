import axios from "axios";
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}
const getAllUsers = (inputId) => {
    // template string
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
const createNewUser = (userData) => {
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
export { handleLoginApi, getAllUsers, createNewUser, editUserInfo, deleteUser, getAllCodeService };
