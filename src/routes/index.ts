// const express = require('express');
import express from 'express';
import { createTransaction, getPageNotFound, getTransactions, getTransaction, getAccTransactions } from '../controllers/transactionController'
import { getAccounts, getAccount, createAccount } from '../controllers/accountsController'
const router = express.Router();

// import express from 'express';

/* GET home page. */
// router.get('/', function(req: express.Request, res: express.Response) {
//   res.render('index', { title: 'Express' });
// });
router.get('/balance', getAccounts);
router.get('/balance/:accountNumber', getAccount);
router.get('/transactions', getTransactions)
router.get('/transactions/:id', getTransaction)
router.get('/balance/:accountNumber/transactions', getAccTransactions)
router.post('/transfer', createTransaction);
router.post('/create-account', createAccount);
router.get('/*', getPageNotFound);

// module.exports = router;

export default router
