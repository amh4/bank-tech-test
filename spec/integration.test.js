const Account = require('../lib/account')
const Transaction = require('../lib/transaction')

describe('Integration testing', () => {
  beforeEach(() => {
    transcation = new Transaction()
    userAccount = new Account(0)
    userWithdrawalTestAccount = new Account(1000)
    consoleSpy = jest.spyOn(console, 'log')
  })

  describe('recordTransaction', () => {
    it('adds a deposit to this.transactionHistory', () => {
      userAccount.recordTransaction(transcation.deposit(100))
      expect(userAccount.transactionHistory[0][0]).toEqual('21/2/2023')
      expect(userAccount.transactionHistory[0][1]).toEqual(100)
      expect(userAccount.transactionHistory[0][2]).toEqual("")
    })

    it('adds two deposits to this.transactionHistory', () => {
      const transaction2 = new Transaction()
      userAccount.recordTransaction(transcation.deposit(100))
      userAccount.recordTransaction(transaction2.deposit(900))
      expect(userAccount.transactionHistory).toHaveLength(2)
      expect(userAccount.transactionHistory[0]).toEqual(['21/2/2023', 900, "",1000])
      expect(userAccount.transactionHistory[1]).toEqual(['21/2/2023', 100, "",100])
    })

    it('checks if the transaction is a credit and adds to current balance if true', () => {
      userAccount.recordTransaction(transcation.deposit(200))
      expect(userAccount.currentBalance).toEqual(200)
    })

    it('records a withdrawal in the transaction history', () => {
      userWithdrawalTestAccount.recordTransaction(transcation.withdrawal(100))
      expect(userWithdrawalTestAccount.transactionHistory[0]).toEqual(['21/2/2023',"", 100 ,900])
    })
  })
})