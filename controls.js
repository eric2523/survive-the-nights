export class Controls {
  constructor() {
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress() {
    switch (event.keyCode) {
      case 115:
        window.alert("s");
        break;
      case 119:
        window.alert("w");
        break;
      case 97:
        window.alert("a");
        break;
      case 100:
        window.alert("d");
        break;
      default:
        break;
    }
  }
}
