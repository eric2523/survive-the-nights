import { mapbase1 } from "./01-mapbase.js"
import { mapbase2 } from "./02-mapbase.js"
import { mapbase3 } from "./03-mapbase.js"
import { mapbase4 } from "./04-mapbase.js"

export const allMaps = {
  1: {
    map: mapbase1,
    zombieCount: 1,
    spawnRate: null,
  },
  2: {
    map: mapbase2,
    zombieCount: 5,
    spawnRate: 2000,
  },
  3: {
    map: mapbase3,
    zombieCount: 10,
    spawnRate: 1500
  },
  4: {
    map: mapbase4,
    zombieCount: 30,
    spawnRate: 1250
  }
}