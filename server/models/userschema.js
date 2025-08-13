const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please enter your name'],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Please enter your email"],
            lowercase: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please enter your password"],

        },
        profileimage: {
            type: String,

        }
    }, {
    timestamps: true
}
);

// hashing the password before saving it to database

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


const User = mongoose.model("User", userSchema);

module.exports = User;