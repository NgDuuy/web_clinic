import express from 'express';
let router = express.Router();
let introController = (app) => {
    return app.get('/', (req, res) => {
        return res.send('hello world');
    });
    return app.use('/', router);
}
module.exports = introController