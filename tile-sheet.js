// import {} from "./sprites/tileset_dungeon.png"

const image = new Image();
image.src = "./sprites/tileset_dungeon.png"

export class TileSheet {
  constructor(map, canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.map = map;
    this.tileSetColumns = map.tilesets[0].columns;
    this.tileHeight = map.tilesets[0].tileheight;
    this.tileWidth = map.tilesets[0].tilewidth;
    this.mapWidth = map.width;
    this.mapHeight = map.height;
    this.mappedTile = map.layers.map((layer) => {
      return layer.data;
    });
    // this.image = new Image();
    // this.image.src = "./sprites/test.png";
    this.drawTiles = this.drawTiles.bind(this);
  }

  drawTiles() {
    // this.image.src = "./sprites/tileset_dungeon.png";
    // let layer = this.mappedTile[0]
    // console.log(layer)
    // for (let i = 0; i < layer.length; i++) {
    //   const currValue = layer[i]
    //   // debugger
    //   let source_x = (currValue % this.tileSetColumns) * this.tileWidth
    //   let source_y = Math.floor(currValue / this.tileSetColumns) * this.tileHeight
    //   let destination_x = ( i % this.mapWidth )
    //   let destination_y = Math.floor( i / this.mapWidth)
    //   debugger
    //   this.ctx.drawImage(this.image, source_x, source_y, this.tileWidth, this.tileHeight, destination_x, destination_y, 32, 32);
    // }
    debugger;
    // this.ctx.fillStyle = "black";
    // this.ctx.rect(0, 0, 50, 50);
    // this.ctx.fillRect(0, 0, 200, 200);
    // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    this.ctx.drawImage(image, 0, 0, this.tileWidth, this.tileHeight, 0, 0, 32, 32);
  }
}
