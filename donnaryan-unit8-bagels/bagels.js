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
var guess;

/* ---- Text Vars ---------------------------------------------------------- */
var txtStart = "I am thinking of a number. Would you like to take a guess?";

/* ---- Fun Stuff ---------------------------------------------------------- */
solution = [generateRandom(), generateRandom(), generateRandom()];
if( solution.length == 3 && cround == 0 ) { displayStart(); }

document.getElementById('guesses').addEventListener('submit', function(e){
	e.preventDefault();
});

/* ---- Functions & Methods ------------------------------------------------- */
function generateRandom() {
	var rand = Math.floor( Math.random() * 9);
	return rand;
}

function displayStart(){
	var div = document.createElement('div');
	div.setAttribute('class', 'helloDave');
	div.innerHTML = '<h2>Hello, Dave</h2><p>' + txtStart +  displayGuessField(cround) + '</p>';
	document.getElementById('guesses').appendChild(div);
}

function displayGuessField(cround) {
	var field = '<div class="row" id="row' + (cround+1) + '"><div class="col-sm-2"><div class="input-group">';
	field += '<input type="number" class="form-control" placeholder="000" id="guess' + (cround+1) + '" />';
	field += '<span class="input-group-btn"><button class="btn btn-primary " type="submit">Guess!</button></span>';
	field += '</div></div></div>';
	return field;
}
