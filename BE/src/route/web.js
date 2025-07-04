import express from 'express';
import homeController from '../controllers/homeController.js';
import userController from '../controllers/userController.js'
let router = express.Router();
let introController = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.post(('/post-crud'), homeController.postCRUD);
    router.get(('/get-crud'), homeController.displayCRUD);
    router.get(('/edit-crud'), homeController.getEditCRUD);
    router.post(('/put-crud'), homeController.putCRUD);
    router.get(('/delete-crud'), homeController.deleteCRUD);



    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/edit-user-info', userController.handleEditUserInfo)
    router.delete('/api/delete-user', userController.handleDeleteUser)

    router.get('/api/allcode', userController.getAllcode)
    return app.use('/', router);
}
module.exports = introController