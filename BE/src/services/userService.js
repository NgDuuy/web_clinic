import db from '../models/index'
import bcrypt from 'bcrypt';
let handleUserLogin = (email, password) => {
    console.log('in handleUserLogin')
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkEmail(email);
            if (isExist) {
                console.log('in check isExist')
                let user = await db.Users.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password'],
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
            console.log("in function check email")
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
module.exports = {
    handleUserLogin: handleUserLogin,
    checkEmail: checkEmail
}