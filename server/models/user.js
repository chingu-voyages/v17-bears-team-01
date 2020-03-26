const mongoose, { Schema, model } = require("mongoose");

var UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    email: String,
    username: String,
    password: String,
    first_name: String,
    last_name: String,
    timezone: String,
    meetings: [{
        type: Schema.Types.ObjectId,
        ref: 'Meeting',
        default: []
    }]
});

const User = model("User", UserSchema);

module.exports = User;
