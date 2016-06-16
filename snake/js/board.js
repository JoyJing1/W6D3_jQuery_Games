const Snake = require('./snake.js');
const Coord = require('./coord.js');

function Board () {
  this.snake = new Snake(new Coord(0, 1));
  this.apples = [];
}

Board.prototype.addApple = function () {
  let coord = new Coord(Math.floor(Math.random() * 15),
                  Math.floor(Math.random() * 15));
  this.apples.push(coord);
};

Board.prototype.appleHere = function(pos) {
  let response = false;
  this.apples.forEach( coord => {
    if (coord.x === pos.x && coord.y === pos.y) {
      response = true;
    }
  });
  return response;
};

module.exports = Board;
