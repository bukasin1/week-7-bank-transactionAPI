"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccount = exports.getAccount = exports.getAccounts = void 0;
const accountModel_1 = require("../model/accountModel");
// function accountGenerator(){
//   let accNum = '01'
//   while(accNum.length < 10){
//     accNum += Math.floor(Math.random() * 10)
//   }
//   return accNum
// }
async function getAccounts(req, res) {
    try {
        const accounts = await accountModel_1.getAllAccounts();
        if (accounts === undefined || accounts.length === 0) {
            res.status(404).send("No accounts created yet");
        }
        else {
            res.status(200).send(accounts);
        }
    }
    catch (error) {
        console.log(error);
    }
}
exports.getAccounts = getAccounts;
async function getAccount(req, res) {
    try {
        const accounts = await accountModel_1.getAllAccounts();
        if (accounts === undefined) {
            res.status(404).send("No accounts created yet");
        }
        else {
            const accNum = req.params.accountNumber;
            const account = await accountModel_1.getOneAccount(accNum);
            if (!account) {
                res.status(404).send({ message: 'Account not found' });
            }
            else {
                res.status(200).send(account);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}
exports.getAccount = getAccount;
async function createAccount(req, res) {
    try {
        const accounts = await accountModel_1.getAllAccounts();
        const { amount, accountNumber } = req.body;
        // const accNumber = accountGenerator()
        let accountNum = '';
        if (!accountNumber) {
            res.status(404).send({ error: "Please enter an account number" });
        }
        else {
            if (typeof accountNumber === 'number') {
                accountNum = accountNumber.toString();
            }
            else if (typeof accountNumber === 'string') {
                accountNum = accountNumber;
            }
            else {
                res.status(404).send({ error: "Invalid account number" });
            }
            if (accountNum.length < 10 || accountNum.length > 10) {
                res.status(404).send({ error: "Invalid account number, please enter a 10 digit number" });
            }
            else {
                const check = accounts.some(acc => acc.accountNr === accountNumber);
                if (check) {
                    res.status(404).send({ error: "Account number already exists" });
                }
                else {
                    const accDetails = {
                        accountNr: accountNumber,
                        balance: amount
                    };
                    const newAcc = await accountModel_1.createNewAccount(accDetails);
                    res.status(201).send(newAcc);
                }
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}
exports.createAccount = createAccount;
//# sourceMappingURL=accountsController.js.map