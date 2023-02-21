const Account = require('../lib/account')
const Transaction = require('../lib/transaction')

describe('Integration testing', () => {
  beforeEach(() => {
    transaction = new Transaction()
    transaction2 = new Transaction()
    transaction3 = new Transaction()
    userAccount = new Account(0)
    userWithdrawalTestAccount = new Account(1000)
    consoleSpy = jest.spyOn(console, 'log')
  })

  afterEach(() => {
    consoleSpy.mockRestore()
  })

  const dateFormatter = () => {
    const date = new Date()
    let day = date.getDate()
    let month = date.getMonth()+1
    let year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  describe('recordTransaction', () => {
    it('adds a deposit to this.transactionHistory', () => {
      userAccount.recordTransaction(transaction.deposit(100))
      expect(userAccount.transactionHistory[0][0]).toEqual(`${dateFormatter()}`)
      expect(userAccount.transactionHistory[0][1]).toEqual(100)
      expect(userAccount.transactionHistory[0][2]).toEqual("")
    })

    it('records two deposits to this.transactionHistory', () => {
      const transaction2 = new Transaction()
      userAccount.recordTransaction(transaction.deposit(100))
      userAccount.recordTransaction(transaction2.deposit(900))
      expect(userAccount.transactionHistory).toHaveLength(2)
      expect(userAccount.transactionHistory[0]).toEqual([`${dateFormatter()}`, 900, "",1000])
      expect(userAccount.transactionHistory[1]).toEqual([`${dateFormatter()}`, 100, "",100])
    })

    it('checks if the transaction is a credit and adds to current balance if true', () => {
      userAccount.recordTransaction(transaction.deposit(200))
      expect(userAccount.currentBalance).toEqual(200)
    })

    it('records a withdrawal in the transaction history', () => {
      userWithdrawalTestAccount.recordTransaction(transaction.withdrawal(100))
      expect(userWithdrawalTestAccount.transactionHistory[0]).toEqual([`${dateFormatter()}`,"", 100 ,900])
    })

    it('updates current balance after withdrawal', () => {
      userWithdrawalTestAccount.recordTransaction(transaction.withdrawal(100))
      expect(userWithdrawalTestAccount.currentBalance).toEqual(900)
    })

    it('records two withdrawals in transaction history', () => {
      userWithdrawalTestAccount.recordTransaction(transaction.withdrawal(100))
      userWithdrawalTestAccount.recordTransaction(transaction2.withdrawal(300))
      expect(userWithdrawalTestAccount.transactionHistory).toHaveLength(2)
      expect(userWithdrawalTestAccount.transactionHistory[0]).toEqual([`${dateFormatter()}`,"", 300 ,600])
      expect(userWithdrawalTestAccount.transactionHistory[1]).toEqual([`${dateFormatter()}`,"", 100 ,900])
    })

    it('returns insufficient funds if balance will fall below 0 post withdrawal', () => {
      expect(userAccount.recordTransaction(transaction.withdrawal(100))).toEqual('Insufficient Funds')
    })
  })

  describe('printStatement', () => {
    it('prints out the header in the requested format', () => {
      userAccount.printStatement()
      expect(consoleSpy).toHaveBeenCalledWith('date || credit || debit || balance')
    })

    it('prints header and 1 transaction', () => {
      userAccount.recordTransaction(transaction.deposit(20))
      userAccount.printStatement()
      expect(consoleSpy).toHaveBeenCalledTimes(2)
      expect(consoleSpy.mock.calls[0][0]).toBe('date || credit || debit || balance')
      expect(consoleSpy.mock.calls[1][0]).toBe(`${dateFormatter()} || 20 ||  || 20`)
    })

    it('prints header with multiple deposits', () => {
      userAccount.recordTransaction(transaction.deposit(151))
      userAccount.recordTransaction(transaction2.deposit(49))
      userAccount.printStatement()
      expect(consoleSpy.mock.calls[0][0]).toBe('date || credit || debit || balance')
      expect(consoleSpy.mock.calls[1][0]).toBe(`${dateFormatter()} || 49 ||  || 200`)
      expect(consoleSpy.mock.calls[2][0]).toBe(`${dateFormatter()} || 151 ||  || 151`)
    })

    it('prints header with multiple withdrawals', () => {
      userWithdrawalTestAccount.recordTransaction(transaction.withdrawal(500))
      userWithdrawalTestAccount.recordTransaction(transaction2.withdrawal(100))
      userWithdrawalTestAccount.printStatement()
      expect(consoleSpy.mock.calls[0][0]).toBe('date || credit || debit || balance')
      expect(consoleSpy.mock.calls[1][0]).toBe(`${dateFormatter()} ||  || 100 || 400`)
      expect(consoleSpy.mock.calls[2][0]).toBe(`${dateFormatter()} ||  || 500 || 500`)
    })

    it('prints header and values for mixed transactions', () => {
      userAccount.recordTransaction(transaction.deposit(1000))
      userAccount.recordTransaction(transaction2.withdrawal(100))
      userAccount.recordTransaction(transaction3.withdrawal(100))
      userAccount.printStatement()
      expect(consoleSpy.mock.calls[0][0]).toBe('date || credit || debit || balance')
      expect(consoleSpy.mock.calls[1][0]).toBe(`${dateFormatter()} ||  || 100 || 800`)
      expect(consoleSpy.mock.calls[2][0]).toBe(`${dateFormatter()} ||  || 100 || 900`)
      expect(consoleSpy.mock.calls[3][0]).toBe(`${dateFormatter()} || 1000 ||  || 1000`)
    })
  })
})