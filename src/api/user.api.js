const { log } = require('console');
const myMd = require('../models/user.model');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');



exports.signUp = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await myMd.userModel.findOne({email: email });

        if (existingUser) {
            return res.status(400).json({ message: "Người dùng đã tồn tại" });
        }
        const profileImage = req.file ? req.file.filename : null;

        const newUser = new myMd.userModel({
            username,
            email,
            password,
            profileImage,
        });

        await newUser.save();
        console.log(newUser);
        res.status(200).json({ message: "Đăng ký người dùng thành công" });


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Có lỗi khi xử lý yêu cầu" });
    }
}

// const authenticateToken = (req, res, next) => {
//     const token = req.headers['authorization'];
//     if (!token) return res.status(404).json({ message: "Token not provider!" });

//     jwt.verify(token, 'quoccon12344321', (err, user) => {
//         if (err) return res.status(403).json({ message: "Invalid token" });
//         req.user = user;
//         next();
//     });
// };

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await myMd.userModel.findOne({ email: email }).populate('contacts');

        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        //kiểm tra mật khẩu
        if (user.password !== password) {
            return res.status(401).json({ message: "Sai mật khẩu" });
        }

        const userPayload = { userId: user.id, username: user.username, email: user.email, image: user.profileImage, contacts: user.contacts };
        const token = jwt.sign(userPayload, 'quoccon12344321', { expiresIn: '1h' });
        console.log("Đăng nhập thành công!");
        console.log(userPayload);
        res.status(200).json({ message: "Đăng nhập thành công", token: token, user: userPayload });
    } catch (error) {
        console.log("Lỗi" + error);
        return res.status(500).json({ message: "Có lỗi khi xử lý yêu cầu" });
    }
}

exports.addFriends = async (req, res, next) => {
    try {
    const userId = req.user.userId;
    const friendId = req.body.friendId;
        const user = await myMd.userModel.findById(userId);
        const friend = await myMd.userModel.findById(friendId);

        if (!user || !friend) {
            return res.status(404).json({ message: "Người dùng hoặc bạn bè không tồn tại" });
        }

        const isFriend = user.contacts.includes(friendId);
        if (isFriend) {
            const updateFriend = await myMd.userModel.findByIdAndUpdate(userId, { $pull: { contacts: friendId } }, { new: true });
            res.json({ message: "Xóa bạn bè thành công", updatedUser });
        }else{
            const updatedUser = await myMd.userModel.findByIdAndUpdate(userId,{$push:{contacts:friendId}},{new:true});
            res.json({ message: "Thêm bạn bè thành công", updatedUser });
        }
    } catch (error) {
        console.log("Đã xảy ra lỗi : ",error);
        res.status(500).json({ message: "Có lỗi khi xử lý yêu cầu" });
    }
}


exports.getAllUser = async (req,res,next) => {
    try {
        const users = await myMd.userModel.find({});
        res.json(users);
    } catch (error) {
        console.log("Có lỗi khi lấy danh sách user :",error);
    }
}   

exports.findUser = async(req,res,next) => {
    try {
        const  {identifier} = req.body;
        const user = await myMd.userModel.find({ $or: [{ username: identifier }, { email: identifier }] });
        if(user.length > 0){
            console.log("Oke");
            
            res.json(user);
        }else{
            console.log("Người dùng không được tìm thấy");
            res.status(404).json({ error: 'Người dùng không được tìm thấy' });
        }
    } catch (error) {
        console.log("Có lỗi khi tìm kiếm người dùng : ",error);
    }
}
