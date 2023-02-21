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
      const userAccount = new Account(1000)
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
      const userAccount = new Account(1000)
      userAccount.recordTransaction(firstMockTransaction.withdrawal())
      userAccount.recordTransaction(secondMockTransaction.withdrawal())
      expect(userAccount.transactionHistory).toHaveLength(2)
    })

    it('returns insufficient funds if balance will fall below 0 on withdrawal', () => {
      const mockTransaction = new Transaction()
      mockTransaction.withdrawal.mockImplementation(() => ['19/2/2023', "", 100])
      const userAccount = new Account(0)
      expect(userAccount.recordTransaction(mockTransaction.withdrawal())).toEqual('Insufficient Funds')
    })

    it('if there are sufficient funds it updates the current balance', () => {
      const mockTransaction = new Transaction()
      mockTransaction.withdrawal.mockImplementation(() => ['19/2/2023', "", 100])
      const userAccount = new Account(150)
      userAccount.recordTransaction(mockTransaction.withdrawal())
      expect(userAccount.currentBalance).toEqual(50)
    })
  })

  // describe('printStatement', () => {
  //   it('prints out the header in a statement format', () => {
  //     const userAccount = new Account(0)
  //     const consoleSpy = jest.spyOn(console, 'log')
  //     userAccount.printStatement()
  //     expect(consoleSpy).toHaveBeenCalledWith('date || credit || debit || balance')
  //   })

  //   it('prints header and transaction', () => {
  //     const mockTransaction = new Transaction()
  //     const userAccount = new Account(0)
  //     mockTransaction.deposit.mockImplementation(() => ['20/2/2023', 100, ""])
  //     userAccount.recordTransaction(mockTransaction.deposit())
  //     const consoleSpy = jest.spyOn(console, 'log')
  //     userAccount.printStatement()
  //     // expect(consoleSpy).toHaveBeenCalledTimes(2)
  //     expect(consoleSpy).toHaveBeenCalledWith('date || credit || debit || balance')
  //     expect(consoleSpy).toHaveBeenCalledWith('20/2/2023 || 100 || || 100')
  //   })
  // })
})