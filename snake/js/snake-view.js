const Board = require('./board.js');
const Coord = require('./coord.js');

function SnakeView (game, $el) {
  this.board = new Board();
  this.board.addApple();
  this.element = $el;

  this.setupBoard(15);
  $("body").keydown(this.handleKeyEvent.bind(this.board));
  setInterval(this.step.bind(this.board), 500);
}

SnakeView.prototype.handleKeyEvent = function(event) {
  switch (event.which) {
    case 37:
      this.snake.turn(Coord.DIRS["W"]);
    break;
    case 38:
      this.snake.turn(Coord.DIRS["N"]);
    break;
    case 39:
      this.snake.turn(Coord.DIRS["E"]);
    break;
    case 40:
      this.snake.turn(Coord.DIRS["S"]);
    break;
    default: return;
  }
  event.preventDefault();
};

SnakeView.prototype.step = function() {
  this.snake.move();
  const $lis = $("li");
  let allLis = Array.from($lis);

  allLis.forEach( li => {
    let $li = $(li);
    let pos = $li.data("pos").split(",").map(el => parseInt(el));
    let coord = new Coord(...pos);
    if (this.snake.onPos(coord)) {
      $li.addClass("snake-body");
    } else {
      $li.removeClass("snake-body");
    }

    if (this.appleHere(coord)) {
      $li.addClass("apple");
    } else {
      $li.removeClass("apple");
    }
  });
};

SnakeView.prototype.setupBoard = function(n) {
  const $grid = $("<ul>");
  for(let i = 0; i < n; i++) {
    for(let j = 0; j < n; j++) {
      let $square = $("<li>").attr("data-pos", [i, j]);
      $grid.append($square);
    }
  }
  this.element.append($grid);
};

module.exports = SnakeView;
