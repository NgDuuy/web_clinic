import db from '../models/index.js';
import CRUDServices from "../services/CRUDservices.js";
let getHomePage = async (req, res) => {
    try {
        let data = await db.Users.findAll();
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
    try {
        let message = await CRUDServices.createNewUser(req.body);
        console.log(message);
        let data = await CRUDServices.getAllUsers();
        return res.render('displayCRUD.ejs', {
            dataTable: data
        })
    }
    catch (error) {
        console.log("Error: ", error);
        return res.status(500).send("Error in postCRUD")
    }
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
let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDServices.deleteUserById(id);
        let data = await CRUDServices.getAllUsers();
        return res.send("Delete success")
    }
    else {
        return res.send('User not found')
    }
}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD

}