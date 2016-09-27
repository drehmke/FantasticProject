var pileA, pileB, pileC;
var boards = ['a', 'b', 'c'];

function startGame() {
    pileA = new Pile( boards[0] );
    pileB = new Pile( boards[1] );
    pileC = new Pile( boards[2] );

    showAllStones();
    playRound( 'player' );
}

function playRound( who )
{
  // At the start of the round - no matter who's playing, check for available piles and stone-counts
  // Stage 1 - Check playable stones
  var test = checkPileAvailablity();
  console.log(test);
  if( test == true )
  {
    var stoneCount = "[1-5]";
    var boardTest = "[" + boards.join('') + "]";
    var playReg = new RegExp( boardTest + stoneCount, "i" );
    console.log(playReg);

    // Stage 2 - Determine play (computer and player)
    var play;
    if( who == "player" ) { play = prompt("How many stones would you like to take from which column? (x#)"); }
    else if ( who == "computer") { play = computerPlay(); }

    // Can the play be made ? (aka: are there stones available)
    if( playReg.test(play) ){
      switch( play.charAt(0) )
      {
        case "a":
          pileA.removeStones( play.charAt(1) ); break;
        case "b":
          pileB.removeStones( play.charAt(1) ); break;
        case "c":
          pileC.removeStones( play.charAt(1) ); break;
      }
    } else {
      //prompt( "Your move was not valid. Please try again.");
    }
    showAllStones();
    if( who == "player" ) { playRound("computer"); }
    else if( who == "computer" ) { playRound("player"); }
  } else {
    console.log('Game Over!');
  }
}
/* ---- Functions ----------------------------------------------------------- */
function showAllStones()
{
  pileA.showStones();
  pileB.showStones();
  pileC.showStones();

}

function checkPileAvailablity() {

  if( pileA.stones === 0 ) { findBoard( 'a' ); }
  if( pileB.stones === 0 ) { findBoard( 'b' ); }
  if( pileC.stones === 0 ) { findBoard( 'c' ); }

  console.log(boards.length);

  if( boards.length == 0 )  { return false; }
  else                      { return true;  }

}
function findBoard( pile ) {
  for( var i = 0; i < boards.length; i++) {
    if( boards[i] == pile ){
      boards.splice(i, 1);
    }
  }
}
function findHighestStoneCount()
{
  var stoneCount = [ pileA.stones, pileB.stones, pileC.stones ];
  console.log(stoneCount);
  stoneCount.sort(function(a,b){ return b - a});
  return stoneCount.shift();
}
function computerPlay()
{
  if( boards.length > 1 )
  { var getPile = boards[Math.floor( Math.random() * boards.length)]; }
  console.log(getPile);
}

/* ---- Prototypes ---------------------------------------------------------- */
function Pile( column ) {
  this.column = column;
  this.displayColumn = this.column.toUpperCase();
  this.stones = 5;

  this.showStones = function() {
    var stonesDisplay = '';
    for( var i = 0; i < this.stones; i++ )
    { stonesDisplay += "O"; }

    // Console.log
    var printme = "Pile " + column.toUpperCase() + ": " + stonesDisplay ;
    console.log(printme);
  }

  this.removeStones = function(num) {
    var newStones = this.stones - num;
    if( newStones < 0 ) { newStones = 0; }
    this.stones = newStones;
  }
}
