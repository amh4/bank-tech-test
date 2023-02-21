class Account{
  constructor(startingBalance){
    this.currentBalance = startingBalance
    this.transactionHistory = []
  }

  recordTransaction(transaction) {
    if(transaction[1] > 0){
      this.currentBalance += transaction[1]
      transaction.push(this.currentBalance)
      this.transactionHistory.unshift(transaction)
    } else {
      this.transactionHistory.unshift(transaction)
    }
  }

}

module.exports = Account