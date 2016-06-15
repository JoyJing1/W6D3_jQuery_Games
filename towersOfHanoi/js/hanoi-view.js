function HanoiView(game, element) {
  this.game = game;
  this.element = element;
  this.setupTowers();
  this.render();
  this.clickedTower = null;
}

HanoiView.prototype.setupTowers = function () {
  this.game.towers.forEach( (tower, i) => {
    const $tower = $("<ul>").addClass("tower").attr("data-pos", i).text(`Tower ${i}`);
    tower.forEach(disk => {
      let $disk = $("<li>").addClass("disk").attr("data-size", disk).text(`Disk ${disk}`);
      $tower.append($disk);
    });
    this.element.append($tower);
  });

};

HanoiView.prototype.render = function () {
  // this.element.append(this.game);
  // $("ul").on("click", event => {
  //
  // })
};

HanoiView.prototype.clickTower = function(event) {
  const $tower = $(event.currentTarget);
  const pos = getPos($tower);

  if (this.clickedTower) {
    this.game.move(getPos(this.clickedTower), pos);
    this.clickedTower.removeClass("clicked");
    this.clickedTower = null;
  } else {
    this.clickedTower = $tower;
    $tower.addClass("clicked");
  }
};

let getPos = function(tower) {
  tower.data("pos").map(el => parseInt(el));
};


module.exports = HanoiView;
