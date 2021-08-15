"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express');
const express_1 = __importDefault(require("express"));
const transactionController_1 = require("../controllers/transactionController");
const accountsController_1 = require("../controllers/accountsController");
const router = express_1.default.Router();
// import express from 'express';
/* GET home page. */
// router.get('/', function(req: express.Request, res: express.Response) {
//   res.render('index', { title: 'Express' });
// });
router.get('/balance', accountsController_1.getAccounts);
router.get('/balance/:accountNumber', accountsController_1.getAccount);
router.get('/transactions', transactionController_1.getTransactions);
router.get('/transactions/:id', transactionController_1.getTransaction);
router.get('/balance/:accountNumber/transactions', transactionController_1.getAccTransactions);
router.post('/transfer', transactionController_1.createTransaction);
router.post('/create-account', accountsController_1.createAccount);
router.get('/*', transactionController_1.getPageNotFound);
// module.exports = router;
exports.default = router;
//# sourceMappingURL=index.js.map