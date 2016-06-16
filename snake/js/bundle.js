/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const SnakeGame = __webpack_require__(1);
	const SnakeView = __webpack_require__(2);
	
	console.log("we're in the main.js");
	
	$( () => {
	  const rootEl = $('.snake');
	  const game = new SnakeGame();
	  new SnakeView(game, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	function SnakeGame () {
	
	}
	
	module.exports = SnakeGame;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(3);
	const Coord = __webpack_require__(5);
	
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Snake = __webpack_require__(4);
	const Coord = __webpack_require__(5);
	
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Coord = __webpack_require__(5);
	
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


/***/ },
/* 5 */
/***/ function(module, exports) {

	function Coord(x, y) {
	  this.x = x;
	  this.y = y;
	}
	
	Coord.DIRS = {"N": new Coord(-1, 0),
	              "E": new Coord(0, 1),
	              "S": new Coord(1, 0),
	              "W": new Coord(0, -1)};
	
	Coord.prototype.plus = function (dir) {
	  return new Coord(this.x + dir.x, this.y + dir.y);
	};
	
	Coord.prototype.equals = function (otherPos) {
	  return (this.x === otherPos.x && this.y === otherPos.y);
	};
	
	Coord.prototype.isOpposite = function (newDir) {
	  return this.x + newDir.x === 0 && this.y + newDir.y === 0;
	};
	
	module.exports = Coord;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map