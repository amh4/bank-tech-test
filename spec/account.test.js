const Account = require('../account')
const Transaction = require('../transaction')

jest.mock('../transaction')

describe('Account class', () => {
  beforeEach(() => {
    Transaction.mockClear()
  });

  describe('recordTransaction', () => {
    it('adds a mock deposit to this.transactionHistory', () => {
      const mockTransaction = new Transaction()
      mockTransaction.deposit.mockImplementation(() => ['20/2/2023', 100, ""])
      const userAccount = new Account(0)
      userAccount.recordTransaction(mockTransaction.deposit())
      expect(userAccount.transactionHistory).toEqual([['20/2/2023', 100, ""]])
    })

    it('adds two mock deposits to this. transactionHistory', () => {
      const firstMockTransaction = new Transaction()
      const secondMockTransaction = new Transaction()
      firstMockTransaction.deposit.mockImplementation(() => ['20/2/2023', 100, ""])
      secondMockTransaction.deposit.mockImplementation(() => ['21/2/2023', 150, ""])
      const userAccount = new Account(0)
      userAccount.recordTransaction(firstMockTransaction.deposit())
      userAccount.recordTransaction(secondMockTransaction.deposit())
      expect(userAccount.transactionHistory).toEqual([['21/2/2023', 150, ""],['20/2/2023', 100, ""]])
    })

    // it('checks whether the transaction is a credit and adds to current balance')
  })
})