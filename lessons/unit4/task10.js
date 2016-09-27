/*
var validEmail = /\S+@\S+\.\S+/;
var email = prompt('Enter your email address:');
if (validEmail.test(email)) {
  console.log('The email is valid!');
} else {
  console.log('That is not a valid email!');
}
*/

// Lab 01 - Test Phone Number Format
/*
var validPhone = /^\d{3}-\d{4}$/;
var phoneNumber = prompt("Please give me your phone number");
if( validPhone.test(phoneNumber) ) {
  console.log( 'The phone number is valid' );
} else {
  alert( 'The phone number is NOT valid.' );
}
*/

// Lab 2 - Count Digits in a String
var findDigts = /\d/g;
var userString = prompt( "Please type something with numbers in it." );
var matchDigits = userString.match(/\d+/g);
console.log( matchDigits.length );
