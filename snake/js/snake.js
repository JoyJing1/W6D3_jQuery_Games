const Coord = require('./coord.js');

function Snake(direction) {
  this.direction = direction;
  this.segments = [ new Coord(3,3) ];
}

Snake.prototype.move = function () {
  let newDir = this.direction;
  console.log(this.segments[0]);
  let newPos = this.segments[0].plus(newDir);

  this.segments.pop();
  this.segments.unshift(newPos);

  if (this.offBoard()) {
    alert('Game Over!');
  }
};

Snake.prototype.turn = function (newDir) {
  if (!this.direction.isOpposite(newDir)) {
    this.direction = newDir;
  }
};

Snake.prototype.offBoard = function () {
  let pos = this.segments[0];
  return (pos.x >= 15 || pos.y >=15);
};

Snake.prototype.onPos = function(pos) {
  let response = false;
  this.segments.forEach( coord => {
    if (coord.x === pos.x && coord.y === pos.y) {
      response = true;
    }
  });
  return response;
};

module.exports = Snake;
