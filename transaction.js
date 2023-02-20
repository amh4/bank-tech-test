class Transaction{
  constructor() {
    this.currentTransaction = []
  }

  deposit(amount) {
    return this.currentTransaction.push(amount)
  }
}

module.exports = Transaction