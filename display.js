import { TileSheet } from "./tile-sheet.js"
// import { jsonMap } from "./sprites/map-01.js"
import { test } from "./sprites/test.js"

export class Display {
  constructor(canvas){
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.tileSheet = new TileSheet(test, canvas);
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

