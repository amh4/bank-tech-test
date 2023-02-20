class Transaction{
  constructor() {
    this.currentTransaction = []
  }

  deposit(amount) {
    this.currentTransaction.push(this.#dateFormatter(), amount)
    console.log(this.currentTransaction)
  }

  #dateFormatter(){
    const date = new Date()
    let day = date.getDate()
    let month = date.getMonth()+1
    let year = date.getFullYear()
    return `${day}/${month}/${year}`
  }
}


module.exports = Transaction