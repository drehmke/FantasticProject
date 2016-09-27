var customer = {
  firstName: "Bill",
  lastName: "Gates",
  displayFullName: function() {
    console.log( this.firstName + " " + this.lastName );
  }
};

customer.displayFullName();

var bankAccount = {
  checking: 500.23,
  savings: 200.00,
  transfer: function(funds) {
    funds = parseInt(funds);
    this.checking = this.checking - funds;
    console.log( 'Checking has been reduced by ' + funds + ' and now totals ' + this.checking + ".");
    this.savings = this.savings + funds;
    console.log( 'Savings has been incremented by ' + funds + ' and now totals ' + this.savings + ".");
  }
};

var amount = prompt( "How much do you want to transfer?" );
bankAccount.transfer(amount);
