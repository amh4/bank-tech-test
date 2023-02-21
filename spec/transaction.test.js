const Transaction = require('../transaction')

describe('Transaction class', () => {
  describe('deposit method', () => {
    it('takes an int as a deposit and adds to transaction details', () => {
      const userTransaction = new Transaction()
      userTransaction.deposit(100)
      expect(userTransaction.currentTransaction).toContain(100)
    })

    it('deposit details also include a date', () => {
      const userTransaction = new Transaction()
      userTransaction.deposit(100)
      expect(userTransaction.currentTransaction).toContain('21/2/2023', 100)
    })

    it('deposit details also include a blank space in the debit column', () => {
      const userTransaction = new Transaction()
      userTransaction.deposit(100)
      expect(userTransaction.currentTransaction).toEqual(['21/2/2023', 100, ""])
    })

    it('returns a message if the user does not enter an int', () => {
      const userTransaction = new Transaction()
      expect(userTransaction.deposit('hello')).toBe('Please enter a number')
    })
  })

  describe('withdrawal method', () => {
    it('takes int for withdrawal and adds details to currentTransaction', () => {
      const userTransaction = new Transaction()
      userTransaction.withdrawal(100)
      expect(userTransaction.currentTransaction).toEqual(['21/2/2023', "", 100])
    })

    it('returns a message if input is not an int', () => {
      const userTransaction = new Transaction()
      expect(userTransaction.withdrawal('hello')).toEqual('Please enter a number')
    })
  })
})