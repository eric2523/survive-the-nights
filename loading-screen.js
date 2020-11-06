import { loadingScreenMap } from "./maps/loading-screen.js"
import { TileSheet } from "./tile-sheet.js"

let floorData = null;
let collidables = [];
loadingScreenMap.layers.forEach((layer) => {
  layer.name === "floor"
    ? (floorData = layer.data)
    : collidables.push(layer.data);
});

const settings = {
  tileSetColumns: loadingScreenMap.tilesets[0].columns,
  tileHeight: loadingScreenMap.tilesets[0].tileheight,
  tileWidth: loadingScreenMap.tilesets[0].tilewidth,
  mapWidth: loadingScreenMap.width,
  mapHeight: loadingScreenMap.height,
};

const image = new Image();
image.src = "./maps/tileset_dungeon.png";

export class LoadingScreen {
  constructor(canvas){
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.image = new Image();
    this.image.src = "./maps/tileset_dungeon.png"
    this.tileSheet = new TileSheet(settings, canvas, floorData, image)
  }

  createBackground(){
    this.tileSheet.drawTiles()
  }

  draw(){
    this.createBackground()
  }
}