export class Collideable {
  constructor(layer, canvas, image, settings) {
    this.settings = settings;
    this.image = image;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.layer = layer;
  }

  render() {
    let layer = this.layer;

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
