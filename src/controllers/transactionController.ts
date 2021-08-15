import {Request, Response} from 'express'
import { create, getAllTransactions, getOneTransaction, getTransactionsByAcc } from '../model/transactionModel'
import { updateAccout, getOneAccount } from '../model/accountModel'

async function getPageNotFound(req: Request, res: Response): Promise<void> {
  try{
      res.status(404).end('Page Not found');
  }catch (err) {
      console.log(err)
  }
}

async function createTransaction(req: Request, res: Response): Promise<void>{
  try{
    const {from, to, amount, description} = req.body;
    const sender = await getOneAccount(from)
    const receiver = await getOneAccount(to)
    if(sender && receiver){
      if(sender.balance > amount){
        const tranzDetails = {
          senderAccount : from,
          amount,
          receiverAccount : to,
          transferDescription : description
        }
        await updateAccout('sender', from, amount)
        await updateAccout('receiver', to, amount)
        const newTranz = await create(tranzDetails)
        res.status(201).send(newTranz)
      }else{
        res.status(404).send({error : "Insufficient funds"})
      }
    }else if(!sender){
      res.status(404).send({error : 'Sender not on the database'})
    }else if(!receiver){
      res.status(404).send({error : 'Receiver not on the database'})
    }else{
      res.status(404).send({error : 'Please enter a valid account number'})
    }
  }catch(error){
    console.log(error)
  }
}

async function getTransactions(req: Request, res: Response): Promise<void>{
  try{
    const transactions = await getAllTransactions()
    if(transactions === undefined){
      res.status(404).send("No transactions made yet")
    }else{
      res.status(200).send(transactions)
    }
  }catch(err){
    console.log(err)
  }
}

async function getTransaction(req: Request, res: Response): Promise<void>{
  try{
    const transactions = await getAllTransactions()
    if(transactions === undefined){
      res.status(404).send("No transactions made yet")
    }else{
      const id = req.params.id
      const transaction = await getOneTransaction(id)
      if(!transaction){
        res.status(404).send({message : 'Transaction not found'})
      }else{
        res.status(200).send(transaction)
      }
    }
  }catch(error){
    console.log(error)
  }
}

async function getAccTransactions(req: Request, res: Response): Promise<void>{
  try{
    const transactions = await getAllTransactions()
    if(transactions === undefined){
      res.status(404).send("No transactions made yet")
    }else{
      const accNum = req.params.accountNumber
      const account = await getOneAccount(accNum)
      const accTranzs = await getTransactionsByAcc(accNum)
      if(!account){
        res.status(404).send({message : 'Account not on database'})
      }else{
        if(accTranzs.length > 0){
          res.status(200).send(accTranzs)
        }else res.status(404).send({message : 'No transactions found for this account'})
      }
    }
  }catch(err){
    console.log(err)
  }
}


export { createTransaction, getPageNotFound, getTransactions, getTransaction, getAccTransactions }
