/* ---- Global Variables ---------------------------------------------------- */



/* ---- Text Variables ------------------------------------------------------ */


/* ---- Fun Stuff ----------------------------------------------------------- */
$('#carSave').click(function(){
})

myMap();

function myMap() {
  var myCenter = new google.maps.LatLng(51.508742,-0.120850);
  var mapCanvas = document.getElementById("map");
  var mapOptions = {center: myCenter, zoom: 5};
  var map = new google.maps.Map(mapCanvas, mapOptions);
  var marker = new google.maps.Marker({
  position:myCenter,
  animation:google.maps.Animation.BOUNCE
  });
  marker.setMap(map);
}


/* ---- Functions & Methods ------------------------------------------------- */
/*
function drawMap(lat, long) {
  var latitude = parseInt(lat);
  var longitude = parseInt(long);
  var mapUrl = 'http://maps.googleapis.com/maps/api/staticmap'
    + '?center=' + latitude + ',' + longitude
    +' &zoom=18'
    + '&size=500x500'
    + '&markers=color:red|' + latitude + ',' + longitude
    + '&sensor=false';
  document.getElementById('map').src = mapUrl;
}
var test = navigator.geolocation.getCurrentPosition(function(position) {
  var mapInfo = [];
  var latitude = position.coords.latitude;
  mapInfo.push(latitude);
  var longitude = position.coords.longitude;
  mapInfo.push(longitude);
  var accuracy = position.coords.accuracy; // in meters
  mapInfo.push(accuracy);
  //var message = 'You are located at ' + latitude + ', ' + longitude + ' with an accuracy of ' + accuracy + ' meters ';
  //console.log(message);

  return mapInfo;
});
*/
/* ---- Prototypes ---------------------------------------------------------- */
