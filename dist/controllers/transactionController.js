"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccTransactions = exports.getTransaction = exports.getTransactions = exports.getPageNotFound = exports.createTransaction = void 0;
const transactionModel_1 = require("../model/transactionModel");
const accountModel_1 = require("../model/accountModel");
async function getPageNotFound(req, res) {
    try {
        res.status(404).end('Page Not found');
    }
    catch (err) {
        console.log(err);
    }
}
exports.getPageNotFound = getPageNotFound;
async function createTransaction(req, res) {
    try {
        const { from, to, amount, description } = req.body;
        const sender = await accountModel_1.getOneAccount(from);
        const receiver = await accountModel_1.getOneAccount(to);
        if (sender && receiver) {
            if (sender.balance > amount) {
                const tranzDetails = {
                    senderAccount: from,
                    amount,
                    receiverAccount: to,
                    transferDescription: description
                };
                await accountModel_1.updateAccout('sender', from, amount);
                await accountModel_1.updateAccout('receiver', to, amount);
                const newTranz = await transactionModel_1.create(tranzDetails);
                res.status(201).send(newTranz);
            }
            else {
                res.status(404).send({ error: "Insufficient funds" });
            }
        }
        else if (!sender) {
            res.status(404).send({ error: 'Sender not on the database' });
        }
        else if (!receiver) {
            res.status(404).send({ error: 'Receiver not on the database' });
        }
        else {
            res.status(404).send({ error: 'Please enter a valid account number' });
        }
    }
    catch (error) {
        console.log(error);
    }
}
exports.createTransaction = createTransaction;
async function getTransactions(req, res) {
    try {
        const transactions = await transactionModel_1.getAllTransactions();
        if (transactions === undefined) {
            res.status(404).send("No transactions made yet");
        }
        else {
            res.status(200).send(transactions);
        }
    }
    catch (err) {
        console.log(err);
    }
}
exports.getTransactions = getTransactions;
async function getTransaction(req, res) {
    try {
        const transactions = await transactionModel_1.getAllTransactions();
        if (transactions === undefined) {
            res.status(404).send("No transactions made yet");
        }
        else {
            const id = req.params.id;
            const transaction = await transactionModel_1.getOneTransaction(id);
            if (!transaction) {
                res.status(404).send({ message: 'Transaction not found' });
            }
            else {
                res.status(200).send(transaction);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}
exports.getTransaction = getTransaction;
async function getAccTransactions(req, res) {
    try {
        const transactions = await transactionModel_1.getAllTransactions();
        if (transactions === undefined || transactions.length === 0) {
            res.status(404).send("No transactions made yet");
        }
        else {
            const accNum = req.params.accountNumber;
            const account = await accountModel_1.getOneAccount(accNum);
            const accTranzs = await transactionModel_1.getTransactionsByAcc(accNum);
            if (!account) {
                res.status(404).send({ message: 'Account not on database' });
            }
            else {
                if (accTranzs.length > 0) {
                    res.status(200).send(accTranzs);
                }
                else
                    res.status(404).send({ message: 'No transactions found for this account' });
            }
        }
    }
    catch (err) {
        console.log(err);
    }
}
exports.getAccTransactions = getAccTransactions;
//# sourceMappingURL=transactionController.js.map