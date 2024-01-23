const express = require('express');
const userApi = require('../api/user.api');
const router = express.Router();
const multer = require('multer');


const storage = multer.diskStorage({
    destination:'../../uploads',
    filename:(req,file,cb) => {
        cb(null,Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
/**
 * 
 * @param{}  app express app
 * 
 */

const initWebRouter = (app) => {
    router.post('/signup/api',upload.single('profileImage'),userApi.signUp);
    router.post('/login/api',userApi.login);
    return app.use('/',router);
}

module.exports = initWebRouter;