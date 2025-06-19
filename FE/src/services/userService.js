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
export { handleLoginApi, getAllUsers, createNewUser };
