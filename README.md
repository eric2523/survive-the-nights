[![github-pages-icon](https://img.shields.io/badge/Hosted%20On-GitHub%20Pages-blue?)](https://eric2523.github.io/survive-the-nights/)
![javascript-icon](https://img.shields.io/badge/Built%20With-JavaScript-yellow)
# Survive the Nights 

Survive the Nights is a 2D shooting game where the player must eliminate all enemies on the map. As the player, you can move around using WASD keys and fire a blast in any direction using arrow keys. 

## Built with 

* JavaScript
* HTML / CSS 

## Play the game!  

Link to the game : https://eric2523.github.io/survive-the-nights/

![demo-img-1](https://github.com/eric2523/survive-the-nights/blob/main/demo/splash-1.png)
![demo-img-2](https://github.com/eric2523/survive-the-nights/blob/main/demo/splash-2.png)

## Collision Detection 

Collision detection was implemented by constructing a function that detected any overlaps between X and Y coordinates. A collidable class was built to make code more DRY. Any collision that is detected moves the player's position to their previous position which stops movement. 
```javascript
let xOverlaps = (playerLeft < tileRight) && (playerRight > tileLeft)
let yOverlaps = (playerTop < tileBottom) && (playerBottom > tileTop)

let _collided = xOverlaps && yOverlaps

if (_collided){
    this.player.xPos = this.player.prevX
    this.player.yPos = this.player.prevY
}
```

## Incremental spawns

One challenge was to figure out how to incrementally spawn enemies. The solution that I came up with was to create a recursive call through ```window.setTimeout```. My original thought was to increment this feature through a regular for loop. The problem with that approach is that the function ``` populateZombies() ``` is only called once during level intialization. Since the recursive calls creates n amount of stacks, the stack calls are present event after a single function call. 
```javascript
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
```
The ```this.populating``` attribute was created to add conditional checking to the game's win condition. This ensured that a player cannot win by just clearing the enemies already rendered but must also clear the enemies that still need to spawn. 
