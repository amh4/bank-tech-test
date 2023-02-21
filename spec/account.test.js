const Account = require('../lib/account')
const Transaction = require('../lib/transaction')

jest.mock('../lib/transaction')

describe('Account class', () => {
  beforeEach(() => {
    Transaction.mockClear()
    mockTransaction = new Transaction()
    userAccount = new Account(0)
    userWithdrawalTestAccount = new Account(1000)
    consoleSpy = jest.spyOn(console, 'log')
  });

  afterEach(() => {
    consoleSpy.mockRestore()
  })

  describe('recordTransaction', () => {
    it('adds a mock deposit to this.transactionHistory', () => {
      mockTransaction.deposit.mockImplementation(() => ['20/2/2023', 100, ""])
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
      userAccount.recordTransaction(firstMockTransaction.deposit())
      userAccount.recordTransaction(secondMockTransaction.deposit())
      expect(userAccount.transactionHistory).toHaveLength(2)
    })

    it('checks whether the transaction is a credit and adds to current balance', () => {
      mockTransaction.deposit.mockImplementation(() => ['20/2/2023', 100, ""])
      userAccount.recordTransaction(mockTransaction.deposit())
      expect(userAccount.currentBalance).toEqual(100)
    })

    it('when the transaction is added to the history it includes the net balance', () => {
      mockTransaction.deposit.mockImplementation(() => ['20/2/2023', 100, ""])
      userAccount.recordTransaction(mockTransaction.deposit())
      expect(userAccount.transactionHistory).toEqual([['20/2/2023', 100, "", 100]])
    })

    it('adds a mock withdrawal to this.transactionHistory', () => {
      mockTransaction.withdrawal.mockImplementation(() => ['19/2/2023', "", 100])
      userWithdrawalTestAccount.recordTransaction(mockTransaction.withdrawal())
      expect(userWithdrawalTestAccount.transactionHistory[0][0]).toEqual('19/2/2023')
      expect(userWithdrawalTestAccount.transactionHistory[0][1]).toEqual("")
      expect(userWithdrawalTestAccount.transactionHistory[0][2]).toEqual(100)
    })

    it('adds two mock withdrawals to this.transactionHistory', () => {
      const firstMockTransaction = new Transaction()
      const secondMockTransaction = new Transaction()
      firstMockTransaction.withdrawal.mockImplementation(() => ['20/2/2023', "", 300])
      secondMockTransaction.withdrawal.mockImplementation(() => ['21/2/2023', "", 250])
      userWithdrawalTestAccount.recordTransaction(firstMockTransaction.withdrawal())
      userWithdrawalTestAccount.recordTransaction(secondMockTransaction.withdrawal())
      expect(userWithdrawalTestAccount.transactionHistory).toHaveLength(2)
    })

    it('returns insufficient funds if balance will fall below 0 on withdrawal', () => {
      mockTransaction.withdrawal.mockImplementation(() => ['19/2/2023', "", 100])
      expect(userAccount.recordTransaction(mockTransaction.withdrawal())).toEqual('Insufficient Funds')
    })

    it('if there are sufficient funds it updates the current balance', () => {
      mockTransaction.withdrawal.mockImplementation(() => ['19/2/2023', "", 100])
      userWithdrawalTestAccount.recordTransaction(mockTransaction.withdrawal())
      expect(userWithdrawalTestAccount.currentBalance).toEqual(900)
    })
  })

  describe('printStatement', () => {
    it('prints out the header in a statement format', () => {
      userAccount.printStatement()
      expect(consoleSpy).toHaveBeenCalledWith('date || credit || debit || balance')
    })

    it('prints header and transaction', () => {
      mockTransaction.deposit.mockImplementation(() => ['20/2/2023', 100, ""])
      userAccount.recordTransaction(mockTransaction.deposit())
      userAccount.printStatement()
      expect(consoleSpy).toHaveBeenCalledTimes(2)
      expect(consoleSpy.mock.calls[0][0]).toBe('date || credit || debit || balance')
      expect(consoleSpy.mock.calls[1][0]).toBe('20/2/2023 || 100 ||  || 100')
    })

    it('prints header and multiple deposits', () => {
      const mockTransaction2 = new Transaction()
      mockTransaction.deposit.mockImplementation(() => ['20/2/2023', 100, ""])
      mockTransaction2.deposit.mockImplementation(() => ['22/2/2023', 100, ""])
      userAccount.recordTransaction(mockTransaction.deposit())
      userAccount.recordTransaction(mockTransaction2.deposit())
      userAccount.printStatement()
      expect(consoleSpy.mock.calls[0][0]).toBe('date || credit || debit || balance')
      expect(consoleSpy.mock.calls[1][0]).toBe('22/2/2023 || 100 ||  || 200')
      expect(consoleSpy.mock.calls[2][0]).toBe('20/2/2023 || 100 ||  || 100')
    })

    it('prints header and multiple withdrawals', () => {
      const mockTransaction2 = new Transaction()
      mockTransaction.withdrawal.mockImplementation(() => ['20/2/2023', "", 50])
      mockTransaction2.withdrawal.mockImplementation(() => ['22/2/2023', "", 25])
      userWithdrawalTestAccount.recordTransaction(mockTransaction.withdrawal())
      userWithdrawalTestAccount.recordTransaction(mockTransaction2.withdrawal())
      userWithdrawalTestAccount.printStatement()
      expect(consoleSpy.mock.calls[0][0]).toBe('date || credit || debit || balance')
      expect(consoleSpy.mock.calls[1][0]).toBe('22/2/2023 ||  || 25 || 925')
      expect(consoleSpy.mock.calls[2][0]).toBe('20/2/2023 ||  || 50 || 950')
    })

    it('prints header and values for deposits and withdrawals', () => {
      mockTransaction.withdrawal.mockImplementation(() => ['20/2/2023', "", 50])
      const mockTransaction2 = new Transaction()
      mockTransaction2.deposit.mockImplementation(() => ['19/2/2023', 100, ""])
      userAccount.recordTransaction(mockTransaction2.deposit())
      userAccount.recordTransaction(mockTransaction.withdrawal())
      userAccount.printStatement()
      expect(consoleSpy.mock.calls[0][0]).toBe('date || credit || debit || balance')
      expect(consoleSpy.mock.calls[1][0]).toBe('20/2/2023 ||  || 50 || 50')
      expect(consoleSpy.mock.calls[2][0]).toBe('19/2/2023 || 100 ||  || 100')
    })
  })
})