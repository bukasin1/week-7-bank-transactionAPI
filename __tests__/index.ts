import {describe, test, expect} from '@jest/globals'
import request from 'supertest'
import app from '../src/app'

// describe('fhshgsj', ()=> {
//   test('gfhhdj', async () => {
//     const res = await request(app).get('/')
//     expect(res.statusCode).toBe(200)
//   })
// })

interface accountObj {
  [key: string] : string | number | string[] | Date
  // [email: string]: string | number | string[]
}

let accounts: accountObj[];

try{
    accounts = require('../databases/accounts.json')
}catch(err){
    console.log(err)
}


describe('Get Requests', () => {
  test('Gets all balance and returns status 200', async() => {
    const res = await request(app).get('/balance')
    expect(res.statusCode).toEqual(200)
  })

  test('Gets an account by account number and returns status 200', async() => {
    const accNum = "0194496491"
    const res = await request(app).get(`/balance/${accNum}`)
    expect(res.statusCode).toEqual(200)
  })

  test('Return 404 for invalid get account number', async() => {
    const accNum = "0194496490"
    const res = await request(app).get(`/balance/${accNum}`)
    expect(res.statusCode).toEqual(404)
  })

  test('Gets an account by account number and returns status 200', async() => {
    const accNum = "0194496491"
    const res = await request(app).get(`/balance/${accNum}`)
    expect(res.statusCode).toEqual(200)
  })

  test('Gets all transactions and returns status 200', async() => {
    const res = await request(app).get(`/transactions`)
    expect(res.statusCode).toEqual(200)
  })
})


describe('Post Requests', () => {
  const accountNum = 1234567890
  const check = accounts.some(acc => acc.accountNr === `${accountNum}`)
  if(!check) {
    test('Creates an account successfully and return status 201', async() => {
      const accDetails = { amount : 5000, accountNumber : 1234567890}
      const res = await request(app).post('/create-account').send(accDetails)
      expect(res.statusCode).toEqual(201)
    })
  }else{
    test('Returns 404 for existing account number', async() => {
      const accDetails = { amount : 5000, accountNumber : 1234567890}
      const res = await request(app).post('/create-account').send(accDetails)
      expect(res.statusCode).toEqual(404)
    })
  }

  test('Creates a transaction successfully and return status 201', async() => {
    const tranzDetails = {from: "0139677601",
      to: "0195440966",
      amount: 2000 }
    const res = await request(app).post('/transfer').send(tranzDetails)
    expect(res.statusCode).toEqual(201)
  })

  test('Returns 404, for sender account number not valid', async() => {
    const tranzDetails = {from: "019544096",
      to: "0139677601",
      amount: 2000 }
    const res = await request(app).post('/transfer').send(tranzDetails)
    expect(res.statusCode).toEqual(404)
  })

  test('Returns 404, for receiver account number not valid', async() => {
    const tranzDetails = {from: "019544096",
      to: "01396776",
      amount: 2000 }
    const res = await request(app).post('/transfer').send(tranzDetails)
    expect(res.statusCode).toEqual(404)
  })

  test('Returns 404, for insufficient funds', async() => {
    const tranzDetails = {from: "0195440966",
      to: "0139677601",
      amount: 20000 }
    const res = await request(app).post('/transfer').send(tranzDetails)
    expect(res.statusCode).toEqual(404)
  })
})
