# Bank Tech Test

## Requirements

1. You should be able to interact with your code via a REPL like IRB or Node.
   (You don't need to implement a command line interface that takes input from STDIN.)

2. Deposits, withdrawal.

3. Account statement (date, amount, balance) printing.

4. Data can be kept in memory (it doesn't need to be stored to a database or anything).

---

## Acceptance Criteria

1. Given a client makes a deposit of 1000 on 10-01-2023
2. And a deposit of 2000 on 13-01-2023
3. And a withdrawal of 500 on 14-01-2023
4. When she prints her bank statement
5. Then she would see:

   date || credit || debit || balance\
   14/01/2023 || || 500.00 || 2500.00\
   13/01/2023 || 2000.00 || || 3000.00\
   10/01/2023 || 1000.00 || || 1000.00

---

## Diagramming and Planning

### Nouns

Date
Amount
Balance

### Verbs

Deposit(to add - credit)
Withdrawal (to subtract - withdrawal)

### Class and Method

```
class Transaction{
  costructor(){
    this.transaction = []
  }

  deposit(amount){
  if(inputCheck(amount))
    let credit = [date, amount, 0, this.balance]
    adds to this.transactionHistory start (unshift)
    adds amount to this.currentBalance
  else
    print error asking for integer as input
  }

  withdraw(amount) {
    if(inputCheck(amount))
      if(check account has enough)
        let debit = [date, 0, amount, this.balance]
        adds to this.transactionHistory start (unshift)
        removes amount from this.currentBalance
      else
        print insufficient funds
    else
      print error asking for integer as input
  }

  inputCheck(userInput){
    checks user input is a number
      returns true
    else returns error message
      "Please enter a number"
  }
}

class Account{
  constructor(startingBalance){
    this.currentBalance = startingBalance
    this.transactionHistory = []
  }

  recordTransaction(transaction){
    checks if its debit/credit
    if debit
      if(this.#minimumFunds(transaction))
        this.transactionHistory.unshift([date, amount, 0, this.currentBalance -= amount])
    else credit
      this.transactionHistory.unshift([date, amount, 0, this.currentBalance += amount])
  }

  printTransactions() {
    prints this.balance in required
    "date || credit || debit || balance"
    credit - - -
    debit - - -
  }

  #minimumFunds(transaction){
    if currentBalance will drop below 0 withdrawal get rejected
  }
}
```

---

### Edge Cases

- User cannot withdraw balance below £0 needs to be checked in withdraw method
- User should only be able to enter a number cannot accept strings. Could have another method to house this as it will need to be called within deposit and withdraw
