export class Collideable {
  constructor(settings, collidables, canvas, image, player) {
    this.settings = settings;
    this.collidables = collidables;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.image = image;
    this.player = player;
    this.mapCollidable = this.mapCollidable.bind(this);
    this.checkCollisions = this.checkCollisions.bind(this);
    this.render = this.render.bind(this);
  }

  checkCollisions() {
    // for (let i = 0; i < this.collidables.length; i++) {
      let playerTop = this.player.yPos 
      let playerBottom = playerTop + 32 
      let playerLeft = this.player.xPos
      let playerRight = playerLeft + 32
      this.collidables[0].forEach((value, idx) => {
        if (value > 0) {
          let tileLeft = (idx % 20) * 32
          let tileTop = Math.floor(idx / 20) * 32;
          let tileRight = tileLeft + 32
          let tileBottom = tileTop + 32
          
          let xOverlaps = (playerLeft < tileRight) && (playerRight > tileLeft)
          let yOverlaps = (playerTop < tileBottom) && (playerBottom > tileTop)

          let _collided = xOverlaps && yOverlaps

          if (_collided){
            this.player.xPos = this.player.prevX
            this.player.yPos = this.player.prevY
          }
     
        }
      });
    // }
  }

  mapCollidable() {
    this.collidables.forEach((layer) => {
      this.render(layer);
    });
  }

  render(layer) {
    for (let i = 0; i < layer.length; i++) {
      const currValue = layer[i] - 1;
      let source_x =
        (currValue % this.settings.tileSetColumns) * this.settings.tileWidth;
      let source_y =
        Math.floor(currValue / this.settings.tileSetColumns) *
        this.settings.tileHeight;
      let destination_x =
        (i % this.settings.mapWidth) * this.settings.tileWidth;
      let destination_y =
        Math.floor(i / this.settings.mapWidth) * this.settings.tileHeight;

      this.ctx.drawImage(
        this.image,
        source_x,
        source_y,
        this.settings.tileWidth,
        this.settings.tileHeight,
        destination_x,
        destination_y,
        this.settings.tileWidth,
        this.settings.tileHeight
      );
    }
  }
}
