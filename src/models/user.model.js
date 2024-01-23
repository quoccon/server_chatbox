const db = require("./db");

const userChema = new db.mongoose.Schema(
    {
        username: { type: String },
        email: { type: String },
        profileImage: { type: String },
        password: { type: String },
    }, {
    collection: "users",
}
)

let userModel = db.mongoose.model("userModel", userChema);
module.exports = { userModel }