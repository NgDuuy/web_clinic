import { raw } from 'body-parser';
import db from '../models/index.js';
import CRUDServices from "../services/CRUDservices.js";
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        })
    }
    catch (e) {
        console.log(e);
    }
}
let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}
let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}
let postCRUD = async (req, res) => {
    let message = await CRUDServices.createNewUser(req.body);
    console.log(message);
    return res.send('post crud from server');
}
let displayCRUD = async (req, res) => {
    let data = await CRUDServices.getAllUsers();
    console.log('------------------------');
    console.log(data);
    console.log('------------------------')
    return res.render('displayCRUD.ejs', {
        dataTable: data
    });
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDServices.getUserInforById(userId);
        // check user data not found

        //let user data
        return res.render("editCRUD.ejs", {
            user: userData
        });
    }
    else {
        return res.send("User not found");
    }
}
let putCRUD = async (req, res) => {
    let data = req.body;
    let allUser = await CRUDServices.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUser
    })
}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD

}