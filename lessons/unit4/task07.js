var quotes = [
  "Frankly, my dear, I don't give a damn.",
  "E.T. phone home!",
  "Show me the money!"
];
var rand = Math.floor(Math.random() * quotes.length); // I'm not adding the +1 because my array is zero-based
alert( quotes[rand] );
