export class Controls {
  constructor(game) {
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.game = game;
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.fireballAudio = new Audio();
    this.fireballAudio = new Audio();
    this.fireballAudio.src =
      "https://raw.githubusercontent.com/eric2523/survive-the-nights/main/sound/Fireball-Sharp-Whoosh-www.fesliyanstudios.com.mp3";
    this.fireballAudio.loop = false;
    this.fireballAudio.volume = 0.25;
  }

  handleKeyUp() {
    if (!this.game.player.animatingDeath) {
      this.game.player.stopMoving();
    }
  }

  handleKeyDown() {
    if (!this.game.player.animatingDeath) {
      switch (event.keyCode) {
        case 37:
          this.game.player.fire("left");
          if (this.game.playSound){
            this.fireballAudio.play();
          }
          break;
        case 38:
          this.game.player.fire("up");
          if (this.game.playSound){
            this.fireballAudio.play();
          }
          break;
        case 39:
          this.game.player.fire("right");
          if (this.game.playSound){
            this.fireballAudio.play();
          }
          break;
        case 40:
          this.game.player.fire("down");
          if (this.game.playSound){
            this.fireballAudio.play();
          }
          break;
        case 83:
          this.game.player.changeDirection("down");
          break;
        case 87:
          this.game.player.changeDirection("up");
          break;
        case 65:
          this.game.player.changeDirection("left");
          break;
        case 68:
          this.game.player.changeDirection("right");
          break;
        default:
          break;
      }
    }
  }
}
