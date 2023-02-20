class Transaction{
  constructor() {
    this.currentTransaction = []
  }

  deposit(amount) {
    const date = new Date()
    let day = date.getDate()
    let month = date.getMonth()+1
    let year = date.getFullYear()
    this.currentTransaction.push(`${day}/${month}/${year}`, amount)
    console.log(this.currentTransaction)
  }
}

module.exports = Transaction