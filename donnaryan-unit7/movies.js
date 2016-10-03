/* To Do List
  Delete movie from array and table List
  Confirm delete Form
  verify all fields are filled in on add Form
  higlight required fields on add Form
*/
/* ---- Global Variables ---------------------------------------------------- */
var movies          = [];
var fullColSpan     = 3;
var delID           = '';
var txtNoMovies     = 'You currently do not have any favorite movies. Go watch some. Find a favorite. List it here.';
var txtDeleteButton = 'No longer a fav';
var txtConfirm      = 'Do you really want to unfavorite ';
var txtAdd          = 'After adding, we have: ';
var txtDel          = 'After deletion, we have : ';

/* ---- The fun stuff ------------------------------------------------------- */
$(document).ready(function(){
  if( movies.length ) {
    // doesn't really trigger as the array is always empty onLoad - but just in case!
  } else {
    noMovies();
  }
})

$('#addMovie').click(function(e){           // Modal Popup - Add Movie Form
  e.preventDefault();
  $('#modalAdd').modal('show');
})

var movieList = document.getElementById('movieList'); // Modal Popup - Confirm Delete
movieList.addEventListener('click', function(e){
  e.preventDefault();
  console.log(e.target.id);
  var movieTitle;
  var movieDirector;
  for(var i = 0; i < movies.length; i++){

    if( movies[i].id == e.target.id ) {
      movieTitle = movies[i].movieTitle;
      movieDirector = movies[i].movieDirector;
      delID = e.target.id;
    }
  }
  var confirmText = txtConfirm + movieTitle + ", directed by " + movieDirector + "?";
  //console.log(confirmText);
  $('#confirmDelBody').html(txtConfirm + movieTitle + ", directed by " + movieDirector + "?");
  $('#modalDelete').modal('show');
})

$('#modalAdd').submit(function(e){
  e.preventDefault();
  var newMovie = new Movie($('#movieTitle').val(), $('#movieDirector').val() );
  $('#modalAdd').modal('hide'); // hide the popup
  resetFormValues();
  movies.push(newMovie);
  // check to see if we have a row for no movies, if so, remove it/hide it
  if( $('#noMovies') ) { $('#noMovies').remove(); }
  displayMovieRow( newMovie );
  displayMoviesArray('add');
})

$('#delMovie').click(function(e){
  e.preventDefault();
  deleteMovies(parseInt(delID));
  delID = ''; // unset, so we don't accidently delete another movie
  displayMoviesArray('del');
})

$(function(){
  $('[data-toggle="tooltip"]').tooltip();
})
/* ---- Helper Functions ---------------------------------------------------- */
function autoGenerate() {
  if( movies.length ) { return movies.length; }
  else                { return 0; }
}

function noMovies() {
  var td = document.createElement('td');
  td.setAttribute('colspan', fullColSpan);
  td.innerHTML = txtNoMovies;
  var tr = document.createElement('tr');
  tr.setAttribute('id', 'noMovies');
  tr.appendChild(td);
  $('#movieList').html(tr);
}

function resetFormValues() {
  $('#movieTitle').val('');
  $('#movieDirector').val('');
}

function displayMovieRow( movieObj ) {
  // set up the delete "button"
  var delButton = "<span class='glyphicon glyphicon-remove del fakeBtn' id='"+movieObj.id+"'></span>";

  // set up our tables
  var td = '<td>' + movieObj.movieTitle + '</td>';
  td += '<td>' + movieObj.movieDirector + '</td>';
  td += '<td class="text-right">' + delButton + '</td>';

  // set up our row & smoosh everything together
  var tr = document.createElement('tr');
  tr.setAttribute('id', 'movie'+movieObj.id)
  tr.innerHTML = td;
  $('#movieList').append(tr);
}

function deleteMovies(id) {
  // update our javascript array
  var newMovies = [];
  console.log(movies);
  for( var i = 0; i < movies.length; i++ ){
    if(movies[i].id != id){
      console.log('Movie id ' + movies.id + " does not match " + id);
      newMovies.push(movies[i]);
      console.log(movies[i]);
    }
  }
  console.log('newMovies : ' + newMovies);
  movies = newMovies;

  // take the row out
  var rowid = "movie"+id;
  document.getElementById(rowid).remove();

  // if we don't have anymore rows left, show the "No movies" line.
  var trs = document.getElementsByTagName('tr');
  if( trs.length == 1 ) { noMovies(); }
}

function displayMoviesArray(aod)
{
  var strungOutMovies = JSON.stringify(movies);
  switch(aod){
    case "add":
      console.log(txtAdd + strungOutMovies);
      break;
    case "del":
      console.log(txtDel + strungOutMovies);
      break;
  }
}
/* ---- Prototypes ---------------------------------------------------------- */
function Movie(movieTitle, movieDirector) {
  this.id             = autoGenerate();
  this.movieTitle     = movieTitle;
  this.movieDirector  = movieDirector;
}
