import { Display } from "./display.js";
import { Player } from "./player.js";
import { mapbase1 } from "./maps/01-mapbase.js";
import { mapbase2 } from "./maps/02-mapbase.js"

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
  tileSetColumns: mapbase1.tilesets[0].columns,
  tileHeight: mapbase1.tilesets[0].tileheight,
  tileWidth: mapbase1.tilesets[0].tilewidth,
  mapWidth: mapbase1.width,
  mapHeight: mapbase1.height,
};

const playerImage = new Image();
playerImage.src = "./sprites/Char_3.png";

const enemyImage = new Image();
enemyImage.src = "./sprites/Char_4.png";

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.player = new Player("player", canvas, 32, 32, 20, playerImage, 1);
    this.zombies = {};
    this.gameOver = false;
    this.win = false;
    this.invicible = false;
    this.level = 0;
    this.parsedSettings = parseFloorData(mapbase2);
    this.display = new Display(
      canvas,
      this.player,
      this.parsedSettings.layer,
      this.parsedSettings.collidables,
      settings
    );
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
          enemyImage,
          1
        ),
      };
    }
  }

  _win() {
    if (!Object.keys(this.zombies).length || !this.player.lives) {
      const nextBtn = document.getElementById("next-level-btn");
      nextBtn.classList.remove("hide")
      this.gameOver = true;
      this.win = true;
    }
  }

  _lose() {
    let playerLeft = this.player.xPos;
    let playerRight = playerLeft + this.player.width;
    let playerTop = this.player.yPos;
    let playerBottom = playerTop + this.player.height;

    Object.values(this.zombies).forEach((zombie) => {
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
      }
    });
  }

  setInvicibility() {
    this.invicible = true;
    window.setTimeout(() => {
      this.invicible = false;
    }, 5000);
  }

  drawZombies() {
    Object.values(this.zombies).forEach((zombie) => {
      if (this.player.fireball) {
        if (zombie.obj.detectHit(this.player.fireball)) {
          let key = zombie.id;
          delete this.zombies[key];
        }
      }
      zombie.obj.moveTowards(this.player);
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
