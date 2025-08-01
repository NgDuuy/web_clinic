import userService from '../services/userService'

let handleLogin = async (req, res) => {
    let email = req.body?.email;
    let password = req.body?.password;
    if (!email || !password) {
        return res.status(500).send({
            errCode: 1,
            message: "Missing inputs parameter!"
        })
    }
    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData ? userData : {}
    })
}
let handleGetAllUsers = async (req, res) => {
    let id = req.query?.id;// All, id 
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters",
            users: []
        })
    }
    let users = await userService.getAllUsers(id);
    console.log(users);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        users
    })
}
let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUSer(req.body);
    console.log(message);
    return res.status(200).json(message);
}
let handleEditUserInfo = async (req, res) => {
    let message = await userService.updateUserInfo(req.body);
    console.log(message);
    return res.status(200).json(message);
}
let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameter"
        })
    }
    let message = await userService.deleteUser(req.body.id);
    console.log(message);
    return res.status(200).json(message);
}
let getAllcode = async (req, res) => {
    try {
        // setTimeout(async () => {
        //     let data = await userService.getAllcodeService(req.query.type);
        //     return res.status(200).json(data);
        // }, 3000)
        let data = await userService.getAllcodeService(req.query.type);
        return res.status(200).json(data);

    } catch (e) {
        console.log('Get all code error', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUserInfo: handleEditUserInfo,
    handleDeleteUser: handleDeleteUser,
    getAllcode: getAllcode
}