import express from 'express';
import homeController from '../controllers/homeController.js';
import userController from '../controllers/userController.js'
import doctorController from '../controllers/doctorController.js'
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



    router.get('/api/top-doctor-home', doctorController.getDoctorTop)
    router.get('/api/get-all-doctor', doctorController.getAllDoctor)
    router.post('/api/save-infor-doctor', doctorController.postInforDoctor)
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById)
    router.post('/api/bulk-create-schedule', doctorController.postBulkCreateSchedule)
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleByDate)
    router.get('/api/get-extra-infor-doctor-by-id', doctorController.getExtraDoctorById)
    return app.use('/', router);
}
module.exports = introController