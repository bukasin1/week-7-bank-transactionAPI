"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAccout = exports.createNewAccount = exports.getOneAccount = exports.getAllAccounts = void 0;
const fs_1 = __importDefault(require("fs"));
let accounts;
try {
    accounts = require('../../databases/accounts.json');
}
catch (err) {
    console.log(err);
}
function getAllAccounts() {
    return new Promise((resolve) => {
        resolve(accounts);
    });
}
exports.getAllAccounts = getAllAccounts;
function getOneAccount(accNum) {
    let account;
    return new Promise((resolve) => {
        if (accounts) {
            account = accounts.find(account => account.accountNr === accNum);
            resolve(account);
        }
        else {
            resolve(account);
        }
    });
}
exports.getOneAccount = getOneAccount;
function createNewAccount(account) {
    return new Promise((resolve) => {
        const date = new Date;
        let newAcc;
        if (!accounts || accounts.length < 1) {
            newAcc = { createdAt: date, ...account };
            accounts = [newAcc];
        }
        else {
            newAcc = { createdAt: date, ...account };
            accounts.push(newAcc);
        }
        const writeStream = fs_1.default.createWriteStream('./databases/accounts.json');
        writeStream.write(JSON.stringify(accounts, null, 4));
        writeStream.end();
        resolve(newAcc);
    });
}
exports.createNewAccount = createNewAccount;
function updateAccout(role, accNum, amount) {
    return new Promise((resolve) => {
        // const date = new Date
        const index = accounts.findIndex(account => account.accountNr === accNum);
        if (role === 'sender') {
            // (accounts[index].balance as number) -= amount
            accounts[index].balance = accounts[index].balance - amount;
        }
        else {
            // (accounts[index].balance as number) += amount
            accounts[index].balance = accounts[index].balance + amount;
        }
        const writeStream = fs_1.default.createWriteStream('./databases/accounts.json');
        writeStream.write(JSON.stringify(accounts, null, 4));
        writeStream.end();
        resolve(null);
    });
}
exports.updateAccout = updateAccout;
//# sourceMappingURL=accountModel.js.map