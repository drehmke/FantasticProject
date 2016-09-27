var animals = [ "fish", "lion", "tapir", "cheetah" ];

// Loop  - for
for( var i = 0; i < animals.length; i++ )
{
  console.log( animals[i] + " (for)");
}

console.log( '------------------------------------------------------------------' );
// Loop 2 - for..in
for( var i in animals )
{
  console.log( animals[i] + " (for..in)");
}

console.log( '------------------------------------------------------------------' );
// Loop 3 - while
var iw = 0;
while( iw < animals.length )
{
  console.log( animals[iw] + " (while)" );
  iw++;
}

console.log( '------------------------------------------------------------------' );
// Loop 4 - do..while
var id = 0;
do {
  console.log(animals[id] + " (do)");
  id++;
} while (id < animals.length);
