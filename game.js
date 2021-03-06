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
    this.populating = false;
    this.zombieCount = allMaps[this.level].zombieCount;
    this.spawnRate = allMaps[this.level].spawnRate;
    this.populateZombies = this.populateZombies.bind(this);
    this.drawZombies = this.drawZombies.bind(this);
    this.render = this.render.bind(this);
    this._win = this._win.bind(this);
    this._lose = this._lose.bind(this);
    this.setInvicibility = this.setInvicibility.bind(this);
    this.createLevel = this.createLevel.bind(this);
    // audio stuff
    this.playSound = false;
  }

  populateZombies(n) {
    if (n <= 0) {
      this.populating = false;
      return null;
    }

    let randomX = Math.round(Math.random() * this.canvas.width);
    let randomY = Math.round(Math.random() * this.canvas.height);

    this.zombies[n] = {
      id: n,
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
    if (n >= 1){
      window.setTimeout(() => {
        this.populating = true;
        return this.populateZombies(n - 1);
      }, this.spawnRate);
    }
  }

  _win() {
    const playAgainBtn = document.getElementById("play-again-btn");

    if (this.player.lives <= 0){
      this.gameOver = true;
      playAgainBtn.classList.remove("hide")
    }

    if (!this.populating){
      if (!Object.keys(this.zombies).length) {
        if (this.level !== this.lastLevel && this.player.lives > 0) {
          const nextBtn = document.getElementById("next-level-btn");
          nextBtn.classList.remove("hide");
          this.level += 1;
        } else {
          playAgainBtn.classList.remove("hide");
        }
        this.gameOver = true;
        this.win = true;
      }
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
    this.spawnRate = allMaps[level].spawnRate;
    this.populateZombies(this.zombieCount);
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
        this.player.animatingDeath = true;
        this.player.stopMoving();
        this.player.animateDeath();
        window.setTimeout(() => {
          this.player.animatingDeath = false;
          this.player.stopMoving();
        }, 1100);
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
      if (zombie.obj.moving) {
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
