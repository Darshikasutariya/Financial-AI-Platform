const mongose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    accountId: {
        typr: mongose.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    type: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    date: {
        typr: date,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    recepitUrl: {
        type: String
    },
    isRecurring: {
        type: Boolean,
        default: false
    },
    recurringinterval: {
        type: String,
        enum: ['daily', 'weekly', 'monthly'],
    },
    nextRecurringdate: {
        type: Date,
        required: true
    },
    lastProcessed: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}
);

const TransactionModel = mongose.model("Transaction", transactionSchema);
module.exports = TransactionModel;