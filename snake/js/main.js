const SnakeGame = require('./game.js');
const SnakeView = require('./snake-view.js');

console.log("we're in the main.js");

$( () => {
  const rootEl = $('.snake');
  const game = new SnakeGame();
  new SnakeView(game, rootEl);
});
