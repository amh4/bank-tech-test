class Transaction{
  constructor() {
    this.currentTransaction = []
  }

  deposit(amount) {
    if(this.#inputTypeChecker(amount)){
      return this.currentTransaction.push(this.#dateFormatter(), amount, "")
    } else {
      return 'Please enter a number'
    }
  }

  withdrawal(amount) {
    this.currentTransaction.push(this.#dateFormatter(), "", amount)
  }

  #dateFormatter(){
    const date = new Date()
    let day = date.getDate()
    let month = date.getMonth()+1
    let year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  #inputTypeChecker(userInput){
    if(Number.isInteger(userInput)){
      return true
    } else{
      return false
    }
  }
}


module.exports = Transaction