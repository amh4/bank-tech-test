class Account{
  constructor(startingBalance){
    this.currentBalance = startingBalance
    this.transactionHistory = []
  }

  recordTransaction(transaction) {
    if(transaction[1] > 0){
      this.currentBalance += transaction[1]
      console.log(this.currentBalance)
      console.log("transaction",transaction)
      
      transaction.push(this.currentBalance)

      this.transactionHistory.unshift(transaction)
      console.log(this.transactionHistory)
    }
  }

}

module.exports = Account