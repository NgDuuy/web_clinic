import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine.js';
import webRoute from './route/web.js';
import initwebRoute from './route/web.js';
import connectDB from './config/connectDB.js';
import cors from 'cors'
require('dotenv').config();
let app = express();
app.use(cors({
    origin: true
}));
//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
viewEngine(app);
initwebRoute(app);
connectDB();
let port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Backend nodejs is running on ther port: ' + port);
    console.log('http://localhost:' + port);
});
