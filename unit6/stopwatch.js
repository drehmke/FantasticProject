var seconds = 1;
var minutes = 1;
var counter;
$('#swTrigger').click(function(e){
  if( $('#swTrigger').html() == "Start") {
    // reset our display
    $('#minutes').html('00');
    $('#seconds').html('00');
    // change our button
    $('#swTrigger').html('Stop');
    toggleClass('trigger');
    // let's not show the pause button until we Start
    $('#swPause').toggle();
    timer();
  } else {
    // stop the time
    window.clearInterval(counter);
    // reset everything
    reset();
    // set the Button back to 'Start'
    $('#swTrigger').html('Start');
    toggleClass('trigger');
    // hide the pause button now we're done
    $('#swPause').toggle();
  }
})

$('#swPause').click(function(e){
  if( $('#swPause').html() == 'Pause') {
    // stop the timer
    window.clearInterval(counter);
    $('#swPause').html('Restart');
    toggleClass('pause');
  } else {
    $('#swPause').html('Pause');
    toggleClass('pause');
    timer();
  }

})
/* ---- Helper Functions ---------------------------------------------- */
function timer() {
  counter = window.setInterval(function(){
    if( seconds == 60 ){
      secounds = 0; // reset to 0 so our seconds counter doesn't keep going
      $('#minutes').html(formatCounter(minutes++));
    }
    $('#seconds').html(formatCounter(seconds++));
  }, 1000);
}

function reset() {
  seconds = 1;
  minutes = 1;
  counter = '';
}

function formatCounter(num)
{
  if( num.toString().length == 1 ) {
    num = "0" + num.toString();
  }
  return num;
}

function toggleClass(button)
{
  if( button == 'trigger' )
  {
    $('#swTrigger').toggleClass('swG');
    $('#swTrigger').toggleClass('swS');
  } else if( button == "pause" )
  {
    $('#swPause').toggleClass('swP');
    $('#swPause').toggleClass('swR');
  }
}
/* -------------------------------------------------------------------- */
