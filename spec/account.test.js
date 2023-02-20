const Account = require('../account')
const Transaction = require('../transaction')

jest.mock('../transaction')

describe('Account class', () => {
  beforeEach(() => {
    Transaction.mockClear()
  });

  it('adds a mock deposit to this.transactionHistory', () => {
    const mockTransaction = new Transaction()
    mockTransaction.deposit.mockImplementation(() => ['20/2/2023', 100, ""])
    const userAccount = new Account(0)
    userAccount.recordTransaction(mockTransaction.deposit())
    expect(userAccount.transactionHistory).toEqual([['20/2/2023', 100, ""]])
  })
})