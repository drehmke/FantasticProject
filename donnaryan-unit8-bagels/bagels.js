/*
 * Bagels - no digits are correct
 * Pico		- 1 digit is correct, placement is not correct
 * Fermi	- One digit is correct, placement is correct
 *
 * Game lasts 20 rounds. If not solved by then, player has lost.
 *
 * Sample: 257
 * Guess 1: 123		= Pico	(2 is correct, not in the right place)
 * Guess 2: 213		= Fermi (2 is correct and is in the right place)
 * Guess 3: 273		= Fermi Pico (2 is correct and in the right place, 7 is correct but not in the right place)
 * Guess 4: 257		= Correct!
 */

/* ---- Global Vars --------------------------------------------------------- */
var solution 	= [];
var cround 		= 0;
var correct		= 0;

/* ---- Text Vars ---------------------------------------------------------- */
var txtStart = "<strong>Hello, Dave.</strong> I am thinking of a 3-digit number. Would you like to take a guess?";
var errorGuessLength = "<strong>I'm sorry, Dave.</strong>  That guess is not 3 digits. Please try again.";
var errorGuess = "<strong>I'm sorry, Dave.</strong>  That was not the number. Would you like to try again?";
var txtPlayerWon = "<strong>Congratulations, Dave.</strong>  You guessed the number. Would you like to play again?";
var txtGameOver = "<strong>I'm sorry, Dave.</strong>  You've tried 20 times to guess my number. I win. Would you like to play again?";

/* ---- Fun Stuff ---------------------------------------------------------- */
//$("#resetBtn").hide();
solution = [generateRandom(), generateRandom(), generateRandom()];
if( solution.length == 3 && cround == 0 ) {
	cround++;
	halSpeech('init');
	document.getElementById('col1').appendChild( displayGuessField(cround) );
	document.getElementById('guess'+cround).focus();
}

$('#guesses').submit(function(e){
	e.preventDefault();
	//verify entry is three characters.
	if( !verifyGuess() ) {
		var check = checkGuess();
		if( correct === 1 ) {
			halSpeech('won');
			disableCurrentGuess('won');
			$("#resetBtn").show();
		} else {
			if( cround === 20 ) { // it took us 20 rounds, we lose
				halSpeech('gameOver');
				disableCurrentGuess('round');
				$("#resetBtn").show();
			} else { // display our hints somewhere and make Hal talk
				$("#resetBtn").hide(); // don't want this showing prematurely
				halSpeech('guessNotRight');
				displayHint(check);
				disableCurrentGuess('round');
				cround++;
				if( cround > 10 ) { var col = 'col2'; }
				else 							{ var col = 'col1'; }
				document.getElementById(col).appendChild( displayGuessField(cround) );
				document.getElementById('guess'+cround).focus();
			}
		}
	}
})

$('#resetBtn').on('click', function(e){
	e.preventDefault();
	resetBoard();
})

/* ---- Functions & Methods ------------------------------------------------- */
function generateRandom() {
	var rand = Math.floor( Math.random() * 9);
	return rand;
}

function halSpeech(stage) {
	switch(stage) {
		case "init":
			document.getElementById('speechbubble').innerHTML = txtStart;
			break;
		case "guesslength":
			document.getElementById('speechbubble').innerHTML = errorGuessLength;
			break;
		case "guessNotRight":
			document.getElementById('speechbubble').innerHTML = errorGuess;
			break;
		case "won":
			document.getElementById('speechbubble').innerHTML = txtPlayerWon;
			break;
		case "gameOver":
			document.getElementById('speechbubble').innerHTML = txtGameOver;
			break;
	}
}

function displayGuessField(cround) {
	var div = document.createElement('div');
	div.setAttribute('class', 'row');
	div.setAttribute('id', 'row'+cround);
	var field = '<div class="col-sm-4"><div class="input-group">';
	field += '<input type="text" class="form-control" placeholder="000" id="guess' + cround + '" />';
	field += '<span class="input-group-btn"><button class="btn btn-success " id="btn' + cround + '" type="submit">Guess!</button></span>';
	field += '</div></div><div class="col-sm-4 form-group" id="containHint'+cround+'">';
	field += '<input type="text" class="form-control" id="hint' + cround + '" disabled />';
	field += '</div>';
	div.innerHTML = field;
	return div;
}

function displayHint(hint) {
	if( hint.length == 0 )
	{
		$('#containHint'+cround).addClass('has-danger');
		$('#hint' + cround).val( 'Bagels' );
	} else {
		$('#containHint'+cround).addClass('has-warning');
		$('#hint' + cround).val( hint );
	}
}

function resetBoard() {
		solution = [generateRandom(), generateRandom(), generateRandom()];
		cround = 0;
		correct = 0;
		$('#col2').html('');
		$('#col1').html( displayGuessField(cround) );
		document.getElementById('guess'+cround).focus();
}

function verifyGuess() {
	var guess = document.getElementById('guess' + cround).value;
	if( guess.length != 3 ) {
		document.getElementById('guess'+cround).focus();
		halSpeech('guesslength');
		return true;
	} else {
		return false;
	}
}

function disableCurrentGuess( text ) {
	document.getElementById('guess'+cround).setAttribute('disabled', '');
	if( text == "won" ) { $('#btn' + cround).text('Correct!'); }
	else 								{ $('#btn' + cround).text("Round " + cround); }

	$('#btn' + cround).addClass('disabled');
}

	function checkGuess() {
	var guessRound = "guess" + cround;
	var guessValue = $('#'+guessRound).val();
	var hint = [];
	var fermiCount = 0;
	for( var i = 0; i < solution.length; i++ ) {
		var isIn = guessValue.includes(solution[i]);
		if( isIn ) { // we have a matching number, where does it match?
			if( solution[i] == guessValue.charAt(i))	{ hint[i] = 'Fermi'; fermiCount++; }
			else 																			{ hint[i] = 'Pico';}
		}
	}

	if( fermiCount == 3) {
		correct = 1;
		return;
	} else {
		var hintString = hint.join(" ");
		return hintString;
	}
}
