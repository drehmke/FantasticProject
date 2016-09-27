// Lab 01
/*
  Knight - Strength (1-10), Health (1-10), Name = Sir Braveheart, sayHello()
  Mage - Magic (1-10), Health (1-10), Name = Mr MagicMan, sayHello()
*/
function Character( name, health )
{
  this.name = name;
  this.health = health;
  this.sayHello = function(){console.log( "Hello! My name is " + this.name ); }
}
function Knight( name, health, strength )
{
  this.strength = strength;
  Character.call( this, name, health );
}
Knight.prototype = new Character();
function Mage( name, health, magic )
{
  this.magic = magic;
  Character.call( this, name, health );
}
Mage.prototype = new Character();

function randomStat()
{
  return Math.floor( Math.random() * 10) + 1;
}

var knight = new Knight( 'Sir Braveheart', randomStat(), randomStat() );
var mage = new Mage( 'Mr MagicMan', randomStat(), randomStat() );
knight.sayHello();
mage.sayHello();


// Lab 2
/*
  Books - title, isAvailable, author, numberofPages
  Video - title, isAvailable, director, totalRunTime
*/
function Media( title, isAvailable )
{
  this.title = title;
  this.isAvailable = isAvailable;
}
function Book( title, isAvailable, author, pages )
{
  this.author = author;
  this.pages = pages;
  Media.call( this, title, isAvailable );
}
Book.prototype = new Media();
function Video( title, isAvailable, director, runTime )
{
  this.director = director;
  this.runTime = runTime;
  Media.call( this, title, isAvailable );
}
Video.prototype = new Media();

var book1 = new Book( 'Dragon Prince', 1, 'Melanie Rawn', 576 );
var book2 = new Book( 'The Star Scroll', 0, 'Melanie Rawn', 595 );
var book3 = new Book( 'Sunrunners Fire', 1, 'Melanie Rawn', 496);
var video1 = new Video( 'X-Men', 1, 'Bryan Singer', 104);
var video2 = new Video( 'X2', 0, 'Bryan Singer', 133);
var catalog = [book1,book2,book3,video1,video2];

function showCatalog( catalog ){
  var showList = '';

  for( var i = 0; i < catalog.length; i++ )
  {
    var avail = '';
    if( catalog[i].isAvailable == 1 ) { avail = ' is available for checkout.'; }
    else                              { avail = ' is not available for checkout.'; }
    console.log( catalog[i].title + avail );
  }
}

showCatalog( catalog );
