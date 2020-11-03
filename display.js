import { TileSheet } from "./tile-sheet.js"
// import { jsonMap } from "./sprites/map-01.js"
// import { map1 } from "./maps/01-map.js"
import { mapbase1 } from "./maps/01-mapbase.js"

export class Display {
  constructor(canvas){
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.tileSheet = new TileSheet(mapbase1, canvas);
    this.draw = this.draw.bind(this)
    this.createBackground = this.createBackground.bind(this)
  }

  // need to write funciton to dynamically create canvas size 

  createBackground(){
    this.tileSheet.drawTiles()
  }

  draw(){
    this.createBackground()
  }
}

