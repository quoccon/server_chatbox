const { default: mongoose } = require("mongoose");
const db = require("./db");

const userChema = new db.mongoose.Schema(
    {
        username: { type: String },
        email: { type: String },
        profileImage: { type: String },
        password: { type: String },
        contacts:[{type:mongoose.Schema.Types.ObjectId,ref:'userModel'}],
    }, {
    collection: "users",
}
)

let userModel = db.mongoose.model("userModel", userChema);
module.exports = { userModel }