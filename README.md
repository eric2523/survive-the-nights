# Survive the Nights 

Survive the Nights is a tile-based platform game where the player must eliminate all enemies on the map. As the player, you can move around using WASD keys and fire a blast in any direction using arrow keys. 

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
