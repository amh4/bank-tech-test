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
      expect(userAccount.transactionHistory[0][0]).toEqual('20/2/2023')
      expect(userAccount.transactionHistory[0][1]).toEqual(100)
      expect(userAccount.transactionHistory[0][2]).toEqual("")
    })

    it('adds two mock deposits to this. transactionHistory', () => {
      const firstMockTransaction = new Transaction()
      const secondMockTransaction = new Transaction()
      firstMockTransaction.deposit.mockImplementation(() => ['20/2/2023', 100, ""])
      secondMockTransaction.deposit.mockImplementation(() => ['21/2/2023', 150, ""])
      const userAccount = new Account(0)
      userAccount.recordTransaction(firstMockTransaction.deposit())
      userAccount.recordTransaction(secondMockTransaction.deposit())
      expect(userAccount.transactionHistory).toHaveLength(2)
    })

    it('checks whether the transaction is a credit and adds to current balance', () => {
      const mockTransaction = new Transaction()
      mockTransaction.deposit.mockImplementation(() => ['20/2/2023', 100, ""])
      const userAccount = new Account(0)
      userAccount.recordTransaction(mockTransaction.deposit())
      expect(userAccount.currentBalance).toEqual(100)
    })

    it('when the transaction is added to the history it includes the net balance', () => {
      const mockTransaction = new Transaction()
      mockTransaction.deposit.mockImplementation(() => ['20/2/2023', 100, ""])
      const userAccount = new Account(0)
      userAccount.recordTransaction(mockTransaction.deposit())
      expect(userAccount.transactionHistory).toEqual([['20/2/2023', 100, "", 100]])
    })

    it('adds a mock withdrawal to this.transactionHistory', () => {
      const mockTransaction = new Transaction()
      mockTransaction.withdrawal.mockImplementation(() => ['19/2/2023', "", 100])
      const userAccount = new Account(0)
      userAccount.recordTransaction(mockTransaction.withdrawal())
      expect(userAccount.transactionHistory[0][0]).toEqual('19/2/2023')
      expect(userAccount.transactionHistory[0][1]).toEqual("")
      expect(userAccount.transactionHistory[0][2]).toEqual(100)
    })

    it('adds two mock withdrawals to this.transactionHistory', () => {
      const firstMockTransaction = new Transaction()
      const secondMockTransaction = new Transaction()
      firstMockTransaction.withdrawal.mockImplementation(() => ['20/2/2023', "", 300])
      secondMockTransaction.withdrawal.mockImplementation(() => ['21/2/2023', "", 250])
      const userAccount = new Account(0)
      userAccount.recordTransaction(firstMockTransaction.withdrawal())
      userAccount.recordTransaction(secondMockTransaction.withdrawal())
      expect(userAccount.transactionHistory).toHaveLength(2)
    })
  })
})