const Transaction = require('../transaction')

describe('Transaction class', () => {
  it('takes an int as a deposit and adds to transaction details', () => {
    const userTransaction = new Transaction()
    userTransaction.deposit(100)
    expect(userTransaction.currentTransaction).toEqual([100])
  })
})