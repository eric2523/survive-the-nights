import { Collideable } from "./collideables.js";

export class TileSheet {
  constructor(map, canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.map = map;
    this.settings = {
      tileSetColumns: map.tilesets[0].columns,
      tileHeight: map.tilesets[0].tileheight,
      tileWidth: map.tilesets[0].tilewidth,
      mapWidth: map.width,
      mapHeight: map.height,
    };
    this.mappedTile = map.layers.map((layer) => {
      return layer;
    });
    this.collidables = [];
    this.image = new Image();
    this.image.src = "./maps/tileset_dungeon.png";
    this.drawTiles = this.drawTiles.bind(this);
    this.renderFloor = this.renderFloor.bind(this);
  }

  drawTiles() {
    this.mappedTile.forEach((layer) => {
      debugger
      if (layer.name === "floor") {
        this.renderFloor(layer.data);
      } else {
        this.renderColliable(layer.data, this.image);
      }
    });
  }

  renderColliable(layer, image) {
    let newCollidable = new Collideable(layer, this.canvas, image, this.settings);
    this.collidables.push(newCollidable);
    newCollidable.render()
  }

  renderFloor(layer) {
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
