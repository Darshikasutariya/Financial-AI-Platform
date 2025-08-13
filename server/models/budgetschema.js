const { default: mongoose } = require('mongoose');

const budgetschema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    lastAlertSent: {
        type: Date
    }
}, {
    timestamps: true
}
);
const BudgetModel = mongoose.model("Budeget", budgetschema);

module.exports = BudgetModel;