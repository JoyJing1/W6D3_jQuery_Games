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
