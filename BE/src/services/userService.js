import { Router } from 'express';
import db from '../models/index'
import bcrypt from 'bcrypt';
import { where } from 'sequelize';
import { raw } from 'body-parser';
const salt = bcrypt.genSaltSync(10);
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkEmail(email);
            if (isExist) {
                let user = await db.Users.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
                    raw: true
                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'ok';
                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';

                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = "User isn't not found."
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = "Your email isn't exist. Please try another email."
            }
            resolve(userData);
        }
        catch (e) {
            reject(e);
        }
    })
}
let checkEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === "All") {
                users = await db.Users.findAll({
                    attributes: {
                        exclude: ['password']
                    },
                })
            }
            if (userId && userId !== "All") {
                users = await db.Users.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    },
                })
            }
            resolve(users);
            // if (users) {
            //     resolve(true);
            // }
            // else {
            //     resolve(false);
            // }
        }
        catch (e) {
            console.log(e);
            reject(e);
        }
    })
}
let createNewUSer = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email exist
            let check = await checkEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: "Email has already used. Try with another email"
                })
            }
            else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.Users.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avatar
                })
                resolve({
                    errCode: 0,
                    message: 'OK'
                })
            }
        }
        catch (e) {
            console.log(e);
            reject(e);
        }
    })
}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hash(password, salt);
            resolve(hashPassword);
        }
        catch (e) {
            reject(e);
        }
    })
}
let updateUserInfo = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.positionId || !data.gender) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameter"
                })
            }
            let user = await db.Users.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.gender = data.gender;
                user.phoneNumber = data.phoneNumber;
                user.address = data.address;
                if (data.avatar) {
                    user.image = data.avatar;
                }
                await user.save();
                resolve({
                    errCode: 0,
                    message: "Update user information succeed"
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: "User isn't found"
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { id: userId }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: "User isn't exist"
                })
            }
            await db.Users.destroy({
                where: { id: userId }
            });
            resolve({
                errCode: 0,
                errMessage: "Delete user succeed"
            })
        }
        catch (e) {
            reject(e);
        }
    })
}
let getAllcodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            }
            else {
                let res = {}
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput },
                    raw: true
                });
                res.errCode = 0;
                res.data = allcode
                resolve(res);
            }

        }
        catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    checkEmail: checkEmail,
    getAllUsers: getAllUsers,
    createNewUSer: createNewUSer,
    updateUserInfo: updateUserInfo,
    deleteUser: deleteUser,
    getAllcodeService: getAllcodeService
}