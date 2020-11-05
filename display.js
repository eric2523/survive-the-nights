import { TileSheet } from "./tile-sheet.js"
import { mapbase1 } from "./maps/01-mapbase.js"
import { Collideable } from "./collideables.js";

let floorData = null;
let collidables = []
mapbase1.layers.forEach((layer) => {
  if (layer.name === "floor"){
    floorData = layer.data 
  } else {
    collidables.push(layer.data)
  }
})

const image = new Image()
image.src = "./maps/tileset_dungeon.png"

const settings = {
  tileSetColumns: mapbase1.tilesets[0].columns,
  tileHeight: mapbase1.tilesets[0].tileheight,
  tileWidth: mapbase1.tilesets[0].tilewidth,
  mapWidth: mapbase1.width,
  mapHeight: mapbase1.height,
}

export class Display {
  constructor(canvas, player){
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.player = player
    this.tileSheet = new TileSheet(settings, canvas, floorData, image);
    this.collidable =  new Collideable(settings, collidables, canvas, image, player)
  }

  // need to write funciton to dynamically create canvas size 

  createBackground(){
    this.tileSheet.drawTiles()
  }

  draw(){
    this.createBackground()
    this.collidable.checkCollisions()
    this.collidable.mapCollidable()
  }
}

