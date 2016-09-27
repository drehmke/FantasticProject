// Lab 01
var fruits = [
  "Apple", "Banana", "Grape", "Peach", "Mango", "Strawberry", "Apricot", "Rasberry", "Blueberry", "Orange"
];
console.log( fruits );

// Lab 02
var products = [
  {name: 'Tesla',   price: 40000},
  {name: 'Milk',    price: 1.99},
  {name: 'Oranges', price: 3.44}
];
var sum = 0;
for( var i = 0; i < products.length; i++ )
{
  sum += products[i].price;
}
console.log( sum );

// Lab 03
var movies = [
  'King Kong',
  'Independence Day',
  'Star Wars',
  'The Godfather'
];
for( var i = 0; i < movies.length; i++ )
{
  if( movies[i].length < 10 )
  {
    //console.log( movies[i].length);
    movies.splice(i, 1);
  }
}
console.log( movies );
