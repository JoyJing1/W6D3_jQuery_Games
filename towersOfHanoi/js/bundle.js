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

	const HanoiGame = __webpack_require__(1);
	const HanoiView = __webpack_require__(2);
	
	console.log("We're in the main.js");
	// console.log('second line');
	
	$( () => {
	  const rootEl = $('.hanoi');
	  const game = new HanoiGame();
	  new HanoiView(game, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	function Game () {
	  this.towers = [[3, 2, 1], [], []];
	};
	
	Game.prototype.isValidMove = function(startTowerIdx, endTowerIdx) {
	    const startTower = this.towers[startTowerIdx];
	    const endTower = this.towers[endTowerIdx];
	
	    if (startTower.length === 0) {
	      return false;
	    } else if (endTower.length == 0) {
	      return true;
	    } else {
	      const topStartDisc = startTower[startTower.length - 1];
	      const topEndDisc = endTower[endTower.length - 1];
	      return topStartDisc < topEndDisc;
	    }
	};
	
	Game.prototype.isWon = function(){
	    // move all the discs to the last or second tower
	    return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	};
	
	
	Game.prototype.move = function(startTowerIdx, endTowerIdx) {
	    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	      this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	      return true;
	    } else {
	      return false;
	    }
	};
	
	
	Game.prototype.print = function(){
	    console.log(JSON.stringify(this.towers));
	};
	
	
	Game.prototype.promptMove = function(reader, callback) {
	    this.print();
	    reader.question("Enter a starting tower: ", start => {
	      const startTowerIdx = parseInt(start);
	      reader.question("Enter an ending tower: ", end => {
	        const endTowerIdx = parseInt(end);
	        callback(startTowerIdx, endTowerIdx)
	      });
	    });
	};
	
	Game.prototype.run = function(reader, gameCompletionCallback) {
	    this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	      if (!this.move(startTowerIdx, endTowerIdx)) {
	        console.log("Invalid move!");
	      }
	
	      if (!this.isWon()) {
	        // Continue to play!
	        this.run(reader, gameCompletionCallback);
	      } else {
	        this.print();
	        console.log("You win!");
	        gameCompletionCallback();
	      }
	    });
	};
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function HanoiView(game, element) {
	  this.game = game;
	  this.element = element;
	  this.clickedTower = undefined;
	  this.setupTowers();
	}
	
	HanoiView.prototype.setupTowers = function () {
	  this.render();
	};
	
	HanoiView.prototype.render = function () {
	  $("ul").remove();
	
	  this.game.towers.forEach( (tower, i) => {
	    const $tower = $("<ul>").addClass("tower").attr("data-pos", i);
	    tower.forEach(disk => {
	      let $disk = $("<li>").addClass(`disk disk${disk}`)
	          .attr("data-size", disk);
	      $tower.append($disk);
	    });
	    this.element.append($tower);
	    $tower.on("click", this.clickTower.bind(this));
	  });
	};
	
	HanoiView.prototype.clickTower = function(event) {
	  const $tower = $(event.currentTarget);
	  let pos = $tower.data("pos");
	  console.log(typeof this.clickedTower);
	
	  if (typeof this.clickedTower !== "undefined") {
	    if (!this.game.isValidMove(this.clickedTower.data("pos"), pos)) {
	      alert("Invalid Move! Try again.");
	    }
	    this.game.move(this.clickedTower.data("pos"), pos);
	    this.clickedTower.removeClass("clicked");
	    this.clickedTower = undefined;
	    this.render();
	    if (this.game.isWon()) {
	      alert("Congratulations, you're a winner!!!");
	    }
	  } else {
	    this.clickedTower = $tower;
	    $tower.addClass("clicked");
	  }
	};
	
	module.exports = HanoiView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map