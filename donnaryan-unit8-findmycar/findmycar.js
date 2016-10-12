var lat;
var lon;

document.getElementById('carSave').addEventListener('click', function(){
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);

    // Enable the Show button since we have something to show now
    toggleShowCar('show');

  }
  else {
    documenet.getElementById('mapDiv').innerHTML = 'Geolocation is not supported by this browser.';
  }
})

document.getElementById('carShow').addEventListener('click', function(){
  var doSomething = false;
  var classes = document.getElementById('carShow').classList;
  for( var i = 0; i < classes.length; i++ ) {
    if( classes[i] != 'disabled') { doSomething = true; }
    else                          { doSomething = false; }

  }

  if( doSomething ) { document.getElementById('showLoc').style.display = 'block'; }

})

document.getElementById('carReset').addEventListener('click', function(){
  document.getElementById('map').src = '';
  document.getElementById('locText').innerHTML = '';
  document.getElementById('showLoc').style.display = 'none';
  lat = '';
  long = '';
  // Disable the Show button since we don't have something to show now
  toggleShowCar('hide');
})

document.getElementById('mapit').addEventListener('click', function() {
  var mapURL = 'https://www.google.com/maps/@' + lat  + ',' + long;
  var map = window.open(mapURL);
})

/* ---- Functions & Methods ------------------------------------------------- */
function showPosition(position) {
  var carCoords = [position.coords.latitude, position.coords.longitude];
  var mapUrl = 'http://maps.googleapis.com/maps/api/staticmap'
    + '?center=' + position.coords.latitude + ',' + position.coords.longitude
    +' &zoom=18'
    + '&size=500x500'
    + '&markers=color:red|' + position.coords.latitude + ',' + position.coords.longitude
    + '&sensor=false';
  document.getElementById('map').src = mapUrl;
  document.getElementById('locText').innerHTML = 'Your car is located at <em>(roughly)</em> ' + position.coords.latitude + ' Latitude, ' + position.coords.longitude + ' Longitude.'
  lat = position.coords.latitude;
  long = position.coords.longitude;
}

function toggleShowCar(state) {
  var newClasses = [];
  var classes = document.getElementById('carShow').classList;
  for( var i = 0; i < classes.length; i++ ) {
    if( classes[i] != 'disabled') { newClasses.push(classes[i]); }
  }

  if( state == "hide") { newClasses.push('disabled'); }
  document.getElementById('carShow').className = newClasses.join(' ') ;
  //console.log(newClasses);
}
