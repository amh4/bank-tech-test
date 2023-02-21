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
      if(this.currentBalance - transaction[2] < 0){
        return 'Insufficient Funds'
      } else {
        this.transactionHistory.unshift(transaction)
      }
    }
  }

  printStatement(){
    console.log('date || credit || debit || balance')
  }


}

module.exports = Account