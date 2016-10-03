var pileA, pileB, pileC;
var rnd = 0;
var boards = ['a', 'b', 'c'];

function startGame() {
    pileA = new Pile( boards[0] );
    pileB = new Pile( boards[1] );
    pileC = new Pile( boards[2] );

    showAllStones( rnd );
    // now, we play
    rnd++;
    playRound( 'player' );
}

function playRound( who )
{
  if( who === 'player')
  {
    var playerMove = prompt("What is your move?");
    var moveTest = /[abc][1-5]/i;
    if( !moveTest.test(playerMove) ) {
      prompt('Your move is in the wrong format. Please enter A, B or C and a number between 1 and 5');
    } else {
      console.log( "Playing round " + rnd + " - " + " The Player" );
      switch( playerMove.charAt(0) )
      {
        case "a":
          pileA.removeStones( playerMove.charAt(1) ); break;
        case "b":
          pileB.removeStones( playerMove.charAt(1) ); break;
        case "c":
          pileC.removeStones( playerMove.charAt(1) ); break;
      }

      showAllStones( rnd );
      rnd++;
      playRound( 'computer' );
    }
  } else if (who === 'computer')
  {
    console.log( "Playing round " + rnd + " - " + " The Computer" );
    var playablePiles = [];
    var getStoneCount;

    if( pileA.stones != 0 ) { playablePiles.push( pileA.column ); }
    if( pileB.stones != 0 ) { playablePiles.push( pileB.column ); }
    if( pileC.stones != 0 ) { playablePiles.push( pileC.column ); }


    if( playablePiles.length > 1 )
    { // determine which pile randomly
      var getPile = Math.floor( Math.random() * playablePiles.length);
    }

    if( playablePiles[getPile] == 'A' )  { getStoneCount = pileA.stones; }
    else if( playablePiles[getPile] == 'B' )  { getStoneCount = pileB.stones; }
    else if( playablePiles[getPile] == 'C' )  { getStoneCount = pileC.stones; }

    if( playablePiles.length > 1 )
    { // determine how many stones randomly
      var takeStones = Math.floor( Math.random() * getStoneCount);
    }
    if( playablePiles[getPile] == 'A' )  { pileA.removeStones(takeStones); }
    else if( playablePiles[getPile] == 'B' )  { pileB.removeStones(takeStones); }
    else if( playablePiles[getPile] == 'C' )  { pileC.removeStones(takeStones); }

    console.log("The computer removed " + takeStones + " from " + playablePiles[getPile] + ".");
    showAllStones( rnd );
    if( playablePiles.length > 1 )
    { // if we didn't take the last stone, go back to the player
      rnd++;
      playRound( 'player' );
    }
  } // if(who)
}

/* ---- Functions ----------------------------------------------------------- */
function showAllStones( rnd )
{
  pileA.showStones( rnd );
  pileB.showStones( rnd );
  pileC.showStones( rnd );
}
/* ---- Prototypes ---------------------------------------------------------- */
function Pile( column )
{
  this.column = column.toUpperCase();
  this.stones = 5;

  this.showStones = function( rnd ){
    var stonesDisplay = '';
    for( var i = 0; i < this.stones; i++ )
    { stonesDisplay += "O"; }

    // Console.log
    var printme = "Pile " + column.toUpperCase() + ": " + stonesDisplay ;
    console.log(printme);
  }

  this.removeStones = function(num){
    var newStones = this.stones - num;
    if( newStones < 0 ) { newStones = 0; }
    this.stones = newStones;
  }
}
