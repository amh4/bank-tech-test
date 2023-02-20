class Account{
  constructor(startingBalance){
    this.currentBalance = startingBalance
    this.transactionHistory = []
  }

  recordTransaction(transaction) {
    this.transactionHistory.unshift(transaction)
  }

}

module.exports = Account