const mongoose = require('mongoose');

const categoriesModel = new mongoose.Schema({
    type: {type: String, default: "Revenue", trim: true},
    color: {type: String, default: "#ab26b8"}
});

const transactionModel= new mongoose.Schema({
    name: {type: String, default:"Anonymous", trim: true},
    type: {type: String, default:"Revenue", trim: true},
    amount: {type: Number, trim: true},
    date: {type: Date, default:Date.now}
});

const Categories = mongoose.model('categories', categoriesModel);
const Transaction = mongoose.model('transaction', transactionModel);

exports.default = Transaction;
module.exports = {
    Categories,
    Transaction
}