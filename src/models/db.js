const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/server_chat")
    .then(() => {
        console.log("Kết nối thành công!");
    }).catch((e) => {
        console.log("Kết nối thất bại!", + e);
    })

module.exports = { mongoose }