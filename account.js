class Account{
  constructor(startingBalance){
    this.currentBalance = startingBalance
    this.transactionHistory = []
  }

  recordTransaction(transaction) {
    if(transaction[1] > 0){
      this.transactionHistory.unshift(transaction)
      this.currentBalance += transaction[1]
    }
  }

}

module.exports = Account