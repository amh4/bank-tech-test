const Transaction = require('../lib/transaction')

describe('Transaction class', () => {
  beforeEach(() => {
    userTransaction = new Transaction()
  });

  const dateFormatter = () => {
    const date = new Date()
    let day = date.getDate()
    let month = date.getMonth()+1
    let year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  describe('deposit method', () => {
    it('takes an int as a deposit and adds to transaction details', () => {
      userTransaction.deposit(100)
      expect(userTransaction.currentTransaction).toContain(100)
    })

    it('deposit details also include a date', () => {
      userTransaction.deposit(100)
      expect(userTransaction.currentTransaction).toContain(`${dateFormatter()}`, 100)
    })

    it('deposit details also include a blank space in the debit column', () => {
      userTransaction.deposit(100)
      expect(userTransaction.currentTransaction).toEqual([`${dateFormatter()}`, 100, ""])
    })

    it('returns a message if the user does not enter an int', () => {
      expect(userTransaction.deposit('hello')).toBe('Please enter a number')
    })
  })

  describe('withdrawal method', () => {
    it('takes int for withdrawal and adds details to currentTransaction', () => {
      userTransaction.withdrawal(100)
      expect(userTransaction.currentTransaction).toEqual([`${dateFormatter()}`, "", 100])
    })

    it('returns a message if input is not an int', () => {
      expect(userTransaction.withdrawal('hello')).toEqual('Please enter a number')
    })
  })
})