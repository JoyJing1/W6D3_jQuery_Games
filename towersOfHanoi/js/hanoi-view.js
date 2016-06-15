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
