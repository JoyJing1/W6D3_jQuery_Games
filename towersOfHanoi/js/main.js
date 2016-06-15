const HanoiGame = require('./game.js');
const HanoiView = require('./hanoi-view.js');

console.log("We're in the main.js");
// console.log('second line');

$( () => {
  const rootEl = $('.hanoi');
  const game = new HanoiGame();
  new HanoiView(game, rootEl);
});
