// Lab 01 - split name using indexOf() and splice()
var fullName = prompt( "What is your full name?" );
// find the index of the space
var spaceIndex = fullName.indexOf(' ');
console.log( spaceIndex );
if( spaceIndex != -1 )
{
  var fname = fullName.slice(0, spaceIndex);
  var lname = fullName.slice(spaceIndex, fullName.length);
  console.log( "Your first name is " + fname.trim() + " and your last name is " + lname.trim()  );
}
else {
  console.log( "You only have one name - " + fullName );
}


// Lab 2
var poem = "dashing through the snow in a one horse open sleigh over the fields we go laughing all the way";
var randPoem = '';
console.log( poem );
var poemWords = poem.split(" ");
for( var i = 0; i < poemWords.length; i++)
{
  var rand = Math.floor(Math.random() * poemWords.length);
  var test = poemWords.slice( rand );
  //console.log( test );
  randPoem += poemWords[rand] + " ";
}
console.log( randPoem );
