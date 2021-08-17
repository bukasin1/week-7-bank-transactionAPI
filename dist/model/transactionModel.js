"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionsByAcc = exports.getOneTransaction = exports.getAllTransactions = exports.create = void 0;
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
let transactions;
try {
    transactions = require('../../databases/transactions.json');
}
catch (error) {
    console.log(error);
}
function create(transaction) {
    return new Promise((resolve) => {
        const date = new Date;
        const id = uuid_1.v4();
        const newTranz = { id: id, createdAt: date, ...transaction };
        if (!transactions || transactions.length < 1) {
            transactions = [newTranz];
        }
        else {
            transactions.push(newTranz);
        }
        const writeStream = fs_1.default.createWriteStream('./databases/transactions.json');
        writeStream.write(JSON.stringify(transactions, null, 4));
        writeStream.end();
        resolve(newTranz);
    });
}
exports.create = create;
function getAllTransactions() {
    return new Promise((resolve) => {
        resolve(transactions);
    });
}
exports.getAllTransactions = getAllTransactions;
function getOneTransaction(id) {
    let transaction;
    return new Promise((resolve) => {
        if (transactions) {
            transaction = transactions.find(transaction => transaction.id === id);
            resolve(transaction);
        }
        else {
            resolve(transaction);
        }
    });
}
exports.getOneTransaction = getOneTransaction;
function getTransactionsByAcc(accNum) {
    let accTranz, accTranz2;
    return new Promise((resolve) => {
        if (transactions) {
            accTranz = transactions.filter(tranz => tranz.senderAccount === accNum || tranz.receiverAccount === accNum);
            accTranz2 = accTranz.map(tranz => {
                if (tranz.senderAccount === accNum) {
                    console.log('sender');
                    // tranz.amount = -tranz.amount
                    // return tranz
                    return {
                        ...tranz,
                        amount: -tranz.amount
                    };
                }
                if (tranz.receiverAccount === accNum) {
                    console.log('receiver');
                    // return tranz
                    return {
                        ...tranz,
                        amount: tranz.amount
                    };
                }
            });
            resolve(accTranz2);
        }
    });
}
exports.getTransactionsByAcc = getTransactionsByAcc;
//# sourceMappingURL=transactionModel.js.map