/* ---- Prototype ----------------------------------------------------------- */
function Pile( column )
{
  this.column = column.toUpperCase();
  this.stones = 5;

  this.showStones = function(){
    var stonesDisplay = '';
    for( var i = 0; i < this.stones; i++ )
    { stonesDisplay += "O"; }
    displayResults( "Pile " + this.column + ": " + stonesDisplay );
  }

  this.removeStones = function(num){
    var newStones = this.stones - num;
    if( newStones < 0 ) { newStones = 0; }
    this.stones = newStones;
  }
}

/* ---- Functions ----------------------------------------------------------- */
function findColumn( playerMove )
{
  var colTest = /[abc][1-5]/i;
  if( !colTest.test(playerMove) ) {
    prompt('Your move is in the wrong format. Please enter A, B or C and a number between 1 and 5');
  } else {
    displayResults( 'Move is good to go' );
  }
}
function displayResults( results )
{
  console.log( results );
}
/* ---- Fun Stuff ----------------------------------------------------------- */
// Do we have a div to work with ?
if( !document.getElementById("nim") ){
  var gameDiv = document.createElement("div");
  var t = document.createTextNode("Let's play Nim");
  gameDiv.appendChild(t);
  document.body.appendChild(gameDiv);
  //displayResults( "Nothing to work with. Try again." );
}
var pileA = new Pile( 'a' );
var pileB = new Pile( 'b' );
var pileC = new Pile( 'c' );

pileA.showStones();
pileB.showStones();
pileC.showStones();

var playerMove = prompt( "Select a pile and a number of stones to remove." );
var playerColumn = findColumn(playerMove);
