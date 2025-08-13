const { default: mongoose } = require('mongoose');
const moongoose = require('mongoose');

const accountSchema = new mongoose.Schema(
    {
        accountname: {
            type: String,
            required: [true, 'Please add an account name'],

        },
        accountbalance: {
            type: Number
        },
        userId: {
            type: moongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        accounttype: {
            type: String,
            required: true
        }
    }, {
    timestamps: true
}
);

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;