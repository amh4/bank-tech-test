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
    it('adds a transaction to this.transactionHistory', () => {
      userAccount.recordTransaction(transcation.deposit(100))
      expect(userAccount.transactionHistory[0][0]).toEqual('21/2/2023')
      expect(userAccount.transactionHistory[0][1]).toEqual(100)
      expect(userAccount.transactionHistory[0][2]).toEqual("")
    })
  })
})