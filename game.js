import { Display } from "./display.js";
import { Player } from "./player.js";

const playerImage = new Image();
playerImage.src = "./sprites/Char_3.png";

const enemyImage = new Image();
enemyImage.src = "./sprites/Char_4.png"

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.player = new Player("player", canvas, 32, 32, 20, playerImage);
    this.zombies = {};
    this.gameOver = false;
    this.invicible = false;
    this.display = new Display(canvas, this.player);
    this.render = this.render.bind(this);
    this.populateZombies = this.populateZombies.bind(this);
    this.drawZombies = this.drawZombies.bind(this);
    this._win = this._win.bind(this);
    this._lose = this._lose.bind(this);
    this.setInvicibility = this.setInvicibility.bind(this);
  }

  populateZombies() {
    for (let i = 0; i < 5; i++) {
      let randomX = Math.round(Math.random() * this.canvas.width);
      let randomY = Math.round(Math.random() * this.canvas.height);

      this.zombies[i] = {
        id: i,
        obj: new Player(
          "zombie",
          this.canvas,
          randomX,
          randomY,
          32,
          enemyImage
        ),
      };
    }
  }

  _win(){
    if (!Object.keys(this.zombies).length || !this.player.lives){
      this.gameOver = true;
    }
  }

  _lose(){
    let playerLeft = this.player.xPos
    let playerRight = playerLeft + this.player.width
    let playerTop = this.player.yPos
    let playerBottom = playerTop + this.player.height

    Object.values(this.zombies).forEach((zombie) => {
      let zombieTop = zombie.obj.yPos;
      let zombieBottom = zombie.obj.yPos + zombie.obj.height;
      let zombieLeft = zombie.obj.xPos;
      let zombieRight = zombie.obj.xPos + zombie.obj.width;

      let xOverlaps = zombieLeft < playerRight && zombieRight > playerLeft;
      let yOverlaps = zombieTop < playerBottom && zombieBottom > playerTop;

      let _collided = xOverlaps && yOverlaps;
      if (_collided){
        this.display.hearts.pop()
        this.player.lives -= 1
        this.setInvicibility();
      }
    })
  }

  setInvicibility(){
    this.invicible = true;
    window.setTimeout(() => {
      this.invicible = false
    }, 5000)
  }

  drawZombies() {
    Object.values(this.zombies).forEach((zombie) => {
      if (this.player.fireball) {
        if (zombie.obj.detectHit(this.player.fireball)) {
          let key = zombie.id;
          delete this.zombies[key];
        }
      }
      zombie.obj.moveTowards(this.player)
      zombie.obj.draw();
    });
  }

  render() {
    this._win();
    if (!this.invicible){
      this._lose();
    }
    this.display.draw();
    this.player.draw();
    this.drawZombies();
  }
}
