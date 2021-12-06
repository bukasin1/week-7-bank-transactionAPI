import {Request, Response} from 'express';
import { getAllAccounts, getOneAccount, createNewAccount } from '../model/accountModel'

// function accountGenerator(){
//   let accNum = '01'
//   while(accNum.length < 10){
//     accNum += Math.floor(Math.random() * 10)
//   }
//   return accNum
// }

async function getAccounts(req: Request, res: Response): Promise<void>{
  try{
    const accounts = await getAllAccounts()
    if(accounts === undefined || accounts.length === 0){
      res.status(404).send("No accounts created yet")
    }else{
      res.status(200).send(accounts)
    }
  }catch(error){
    console.log(error)
  }
}

async function getAccount(req: Request, res: Response): Promise<void>{
  try{
    const accounts = await getAllAccounts()
    if(accounts === undefined){
      res.status(404).send("No accounts created yet")
    }else{
      const accNum = req.params.accountNumber
      const account = await getOneAccount(accNum)
      if(!account){
        res.status(404).send({message : 'Account not found'})
      }else{
        res.status(200).send(account)
      }
    }
  }catch(error){
    console.log(error)
  }
}

async function createAccount(req: Request, res: Response): Promise<void>{
  try{
    const accounts = await getAllAccounts()
    const { amount, accountNumber } = req.body
    // const accNumber = accountGenerator()
    let accountNum = ''
    if(!accountNumber){
      res.status(404).send({error : "Please enter an account number"})
    }else{
      if(typeof accountNumber === 'number'){
        accountNum = accountNumber.toString()
      }else if(typeof accountNumber === 'string'){
        accountNum = accountNumber
      }else{
        res.status(404).send({error : "Invalid account number"})
      }

      if(accountNum.length < 10 || accountNum.length > 10){
        res.status(404).send({error : "Invalid account number, please enter a 10 digit number"})
      }else{
        const check = accounts.some(acc => acc.accountNr === accountNum)
        if(check){
          res.status(404).send({error : "Account number already exists"})
        }else{
          const accDetails = {
            accountNr : accountNum,
            balance : amount
          }
          const newAcc = await createNewAccount(accDetails)
          res.status(201).send(newAcc)
        }
      }
    }
  }catch(error){
    console.log(error)
  }
}


export { getAccounts, getAccount, createAccount }
