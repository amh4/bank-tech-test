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
        this.currentBalance -= transaction[2]
        this.transactionHistory.unshift(transaction)
      }
    }
  }

  printStatement(){
    console.log('date || credit || debit || balance')
    this.transactionHistory.forEach(transaction => 
      console.log(`${transaction[0]} || ${transaction[1]} || ${transaction[2]} || ${transaction[3]}`))
  }


}

module.exports = Account