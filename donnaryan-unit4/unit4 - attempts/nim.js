var pileA, pileB, pileC;
var boards  = ['a', 'b', 'c'];
var players = ['player', 'computer'];
var rnd     = 1;
var txtGameOver       = "Game Over. Clear your board (console) and click 'Start A New Game' to try again.";
var txtPlayerMove     = "Select the pile and number of stones you would like to remove";
var txtPlayerInvalid  = "Your move was invalid. Please try again.";

function startGame() {
    pileA = new Pile( boards[0] );
    pileB = new Pile( boards[1] );
    pileC = new Pile( boards[2] );
    rnd = 1; // resetting in case we clear console and try again

    showAllStones();

    playRound( players[Math.floor( Math.random() * players.length)] );
}

function playRound( who ) {
  // step 1 - has the board been cleared?
  if( countAllStones() == 0 ) {
    // No more stones to play
    console.log( txtGameOver);
  } else {
    console.log("Round " + rnd + " - played by " + who );
    // we still have stones in play - so get our move from whomever is playing
    if( who == "computer"){
      var play = computerPlay();
      var next = "player";
    } else if ( who == "player") {
      var play = prompt( txtPlayerMove );
      var next = "computer";
    }

    // verify the move is valid
    var playReg = new RegExp( "[abc][1-5]", "i" );
    if( playReg.test(play) ) {
      // now can we actually make the move
      switch( play.charAt(0) )
      {
        case "a":
          if( pileA.stones >= play.charAt(1) )
          {
            pileA.removeStones( play.charAt(1) );
          }
           break;
        case "b":
        if( pileB.stones >= play.charAt(1) )
        {
          pileB.removeStones( play.charAt(1) );
        }
         break;
        case "c":
        if( pileC.stones >= play.charAt(1) )
        {
          pileC.removeStones( play.charAt(1) );
        }
         break;
      }

    } else {
      console.log(txtPlayerInvalid);
      playRound( 'player' );
    }

    showAllStones();
    rnd++;
    playRound( next );
  }
}

/* ---- Functions ----------------------------------------------------------- */
function showAllStones() {
  pileA.showStones();
  pileB.showStones();
  pileC.showStones();
}

function countAllStones() {
  var allStones = [ pileA.stones, pileB.stones, pileC.stones ];
  var zeroCount = 0;
  for( var i = 0; i < allStones.length; i++ ) {
    if( allStones[i] != 0 ) { zeroCount++; }
  }
  return zeroCount;
}

/*
 * This function is for testing, to make sure we don't get a constant prompt loop
 */
function setAllToZero() {
  pileA.stones = 0;
  pileB.stones = 0;
  pileC.stones = 0;
}

function computerPlay() {
  var canWeWin = countAllStones();
  if( countAllStones() == 1 ) {
    // find that stone and take it!
    for( var i = 0; i < boards.length; i++ ) {
      switch( boards[i] ){
        case "a":
          if( pileA.stones != 0 ) {
            var takeStones = pileA.stones;
            var getPile = 'a';
          }
          break;
        case "b":
        if( pileB.stones != 0 ) {
          var takeStones = pileB.stones;
          var getPile = 'b';
        }
        break;
        case "c":
        if( pileC.stones != 0 ) {
          var takeStones = pileC.stones;
          var getPile = 'c';
        }
        break;
      }
    }
  } else {
    // determine the pile we'll use
    var getPile = boards[Math.floor( Math.random() * boards.length)];
    // determine how many stones
    var getPossibleStones = 0;
    switch( getPile ){
      case "a": getPossibleStones = pileA.stones; break;
      case "b": getPossibleStones = pileA.stones; break;
      case "c": getPossibleStones = pileA.stones; break;
    }
    var takeStones = Math.floor( Math.random() * getPossibleStones ) + 1;

  }
  var play = getPile + takeStones;
  return play;
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
