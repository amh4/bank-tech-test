class Transaction{
  constructor() {
    this.currentTransaction = []
  }

  deposit(amount) {
    if(Number.isInteger(amount)){
      return this.currentTransaction.push(this.#dateFormatter(), amount, "")
    } else {
      return 'Please enter a number'
    }
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