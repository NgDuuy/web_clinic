
import bcrypt from 'bcrypt';
import db from '../models/index';
import { where } from 'sequelize';
const salt = bcrypt.genSaltSync(10);

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            // data.password = hashPasswordFromBcrypt;
            await db.Users.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId
            });
            resolve('create a new user succeed!');
        }
        catch (e) {
            console.error("❌ Error in createNewUser:", e);
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
let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.Users.findAll({ raw: true })
            resolve(users);
        }
        catch (e) {
            reject(e);
        }
    })
}
let getUserInforById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { id: userId },
                raw: true
            });
            if (user) {
                resolve(user);
            }
            else {
                resolve([]);
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                let allUser = await db.Users.findAll();
                resolve(allUser);
            }
            else {
                resolve();
            }

        }
        catch (e) {
            console.log(e);
        }
    })
}
let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { id: userId }
            })
            if (user) {
                await user.destroy();
            }
            resolve();
        }
        catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    getUserInforById: getUserInforById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById

}