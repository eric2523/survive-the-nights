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
    for (let i = 0; i < this.collidables.length; i++) {
      this.collidables[i].forEach((value, idx) => {
        if (value !== 0) {
          let topLeftX =
            (idx % this.settings.mapWidth) * this.settings.tileWidth;
          let topLeftY = this.canvas.height - 32 
          // let bottomRightX = topLeftX + 32;
          let bottomRightY = this.canvas.height

          // check Y top
          if (this.player.yPos <= 32) {
            this.player.yPos = 32;
          }
          // check Y bottom
          if (
            this.player.yPos + 32 >= topLeftY &&
            this.player.yPos + 32 <= bottomRightY
          ) {
            this.player.yPos = topLeftY - 32
          }
        }
      });
    }
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
