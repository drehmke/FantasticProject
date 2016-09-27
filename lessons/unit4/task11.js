// Lab 01
function Customer(fname, lname)
{
  this.firstName = fname;
  this.lastName = lname;
  this.fullName = this.firstName + " " + this.lastName;
  this.displayFullName = function(){ console.log( this.fullName ) };
}

var customer1 = new Customer( "Bill", "Gates");
var customer2 = new Customer("Steve", "Jobs");
var customer3 = new Customer("Larry", "Page");
customer1.displayFullName();
customer2.displayFullName();
customer3.displayFullName();


// Lab 02
function Animal( name, sound )
{
  this.aName = name;
  this.aSound = sound;
  this.makeSound = function(){ console.log( "I am a " + this.aName + " and I go " + this.aSound + " " + this.aSound + "!"); }
}

var animal1 = new Animal( 'dog', 'woof' );
var animal2 = new Animal( 'cat', 'meow' );
var animal3 = new Animal( 'pig', 'oink' );
animal1.makeSound();
animal2.makeSound();
animal3.makeSound();
