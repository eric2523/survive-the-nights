import { Display } from "./display.js";
import { Player } from "./player.js";
import { allMaps } from "./maps/maps-central.js";

function parseFloorData(mapbase) {
  let parsed = {};
  let collidables = [];
  mapbase.layers.forEach((layer) => {
    layer.name === "floor"
      ? (parsed["layer"] = layer.data)
      : collidables.push(layer.data);
  });
  parsed["collidables"] = collidables;
  return parsed;
}

const settings = {
  tileSetColumns: allMaps[1].map.tilesets[0].columns,
  tileHeight: allMaps[1].map.tilesets[0].tileheight,
  tileWidth: allMaps[1].map.tilesets[0].tilewidth,
  mapWidth: allMaps[1].map.width,
  mapHeight: allMaps[1].map.height,
};

const playerImage = new Image();
playerImage.src = "./sprites/Char_3.png";

const enemyImage = new Image();
enemyImage.src = "./sprites/Char_4.png";

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.player = new Player("player", canvas, 32, 32, 2, playerImage, 1);
    this.zombies = {};
    this.gameOver = false;
    this.win = false;
    this.invicible = false;
    this.level = 1;
    this.lastLevel = Object.keys(allMaps).length;
    this.parsedSettings = parseFloorData(allMaps[this.level].map);
    this.display = new Display(
      canvas,
      this.player,
      this.parsedSettings.layer,
      this.parsedSettings.collidables,
      settings
    );
    this.zombieCount = allMaps[this.level].zombieCount;
    this.populateZombies = this.populateZombies.bind(this);
    this.drawZombies = this.drawZombies.bind(this);
    this.render = this.render.bind(this);
    this._win = this._win.bind(this);
    this._lose = this._lose.bind(this);
    this.setInvicibility = this.setInvicibility.bind(this);
    this.createLevel = this.createLevel.bind(this);
  }

  populateZombies() {
    for (let i = 0; i < this.zombieCount; i++) {
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
          enemyImage,
          1
        ),
      };
    }
  }

  _win() {
    if (!Object.keys(this.zombies).length || this.player.lives <= 0) {
      if (this.level !== this.lastLevel && this.player.lives > 0) {
        const nextBtn = document.getElementById("next-level-btn");
        nextBtn.classList.remove("hide");
        this.level += 1;
      } else {
        const playAgainBtn = document.getElementById("play-again-btn");
        playAgainBtn.classList.remove("hide");
      }
      this.gameOver = true;
      this.win = true;
    }
  }

  reset() {
    this.gameOver = false;
    this.win = false;
    this.invicible = false;
    this.player.resetStartingPos();
    this.player.firing = false;
  }

  createLevel(level) {
    this.reset();
    this.parsedSettings = parseFloorData(allMaps[level].map);
    this.display = new Display(
      this.canvas,
      this.player,
      this.parsedSettings.layer,
      this.parsedSettings.collidables,
      settings
    );
    this.display.initializeLives();
    this.zombieCount = allMaps[level].zombieCount;
    this.populateZombies();
  }

  _lose() {
    let playerLeft = this.player.xPos;
    let playerRight = playerLeft + this.player.width;
    let playerTop = this.player.yPos;
    let playerBottom = playerTop + this.player.height;

    const allZombies = Object.values(this.zombies);
    for (let i = 0; i < allZombies.length; i++) {
      let zombie = allZombies[i];
      let zombieTop = zombie.obj.yPos;
      let zombieBottom = zombie.obj.yPos + zombie.obj.height;
      let zombieLeft = zombie.obj.xPos;
      let zombieRight = zombie.obj.xPos + zombie.obj.width;

      let xOverlaps = zombieLeft < playerRight && zombieRight > playerLeft;
      let yOverlaps = zombieTop < playerBottom && zombieBottom > playerTop;

      let _collided = xOverlaps && yOverlaps;
      if (_collided) {
        this.display.hearts.pop();
        this.player.lives -= 1;
        this.setInvicibility();
        break;
      }
    }
  }

  setInvicibility() {
    this.invicible = true;
    window.setTimeout(() => {
      this.invicible = false;
    }, 5000);
  }

  drawZombies() {
    Object.values(this.zombies).forEach((zombie) => {
      // zombie.obj.moving = true;
      if (this.player.firing) {
        if (zombie.obj.detectHit(this.player.fireball)) {
          let key = zombie.id;
          zombie.obj.moving = false;
          zombie.obj.animateDeath();
          window.setTimeout(() => {
            delete this.zombies[key];
          }, 1000);
        }
      }
      if (zombie.obj.moving){
        zombie.obj.moveTowards(this.player);
      }
      zombie.obj.draw();
    });
  }

  render() {
    this._win();
    if (!this.invicible) {
      this._lose();
    }
    this.display.draw();
    this.player.draw();
    this.drawZombies();
  }
}
