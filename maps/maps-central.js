import { mapbase1 } from "./01-mapbase.js"
import { mapbase2 } from "./02-mapbase.js"
import { mapbase3 } from "./03-mapbase.js"

export const allMaps = {
  1: {
    map: mapbase1,
    zombieCount: 1
  },
  2: {
    map: mapbase2,
    zombieCount: 3
  },
  3: {
    map: mapbase3,
    zombieCount: 5
  }
}