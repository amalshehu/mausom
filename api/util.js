export const wind = (speed) => {
  const table = {
    Calm: {
      speed_interval: [0, 0.3],
      desc: "0-1   Smoke rises straight up",
    },
    "Light air": {
      speed_interval: [0.3, 1.6],
      desc: "1-3 One can see downwind of the smoke drift",
    },
    "Light breeze": {
      speed_interval: [1.6, 3.4],
      desc: "4-6 One can feel the wind. The leaves on the trees move, the wind can lift small streamers.",
    },
    "Gentle Breeze": {
      speed_interval: [3.4, 5.5],
      desc: "7-10 Leaves and twigs move. Wind extends light flag and pennants",
    },
    "Moderate breeze": {
      speed_interval: [5.5, 8],
      desc: "11-16   The wind raises dust and loose papers, touches on the twigs and small branches, stretches larger flags and pennants",
    },
    "Fresh Breeze": {
      speed_interval: [8, 10.8],
      desc: "17-21   Small trees in leaf begin to sway. The water begins little waves to peak",
    },
    "Strong breeze": {
      speed_interval: [10.8, 13.9],
      desc: "22-27   Large branches and smaller tribes moves. The whiz of telephone lines. It is difficult to use the umbrella. A resistance when running.",
    },
    "High wind, near gale": {
      speed_interval: [13.9, 17.2],
      desc: "28-33   Whole trees in motion. It is hard to go against the wind.",
    },
    Gale: {
      speed_interval: [17.2, 20.7],
      desc: "34-40   The wind break twigs of trees. It is hard to go against the wind.",
    },
    "Severe Gale": {
      speed_interval: [20.8, 24.5],
      desc: "41-47   All large trees swaying and throws. Tiles can blow down.",
    },
    Storm: {
      speed_interval: [24.5, 28.5],
      desc: "48-55   Rare inland. Trees uprooted. Serious damage to houses.",
    },
    "Violent Storm": {
      speed_interval: [28.5, 32.7],
      desc: "56-63   Occurs rarely and is followed by destruction.",
    },
    Hurricane: {
      speed_interval: [32.7, 64],
      desc: "Occurs very rarely. Unusually severe damage.",
    },
  }
  return table[
    Object.keys(table).find((key) => {
      return (
        speed >= table[key].speed_interval[0] &&
        speed <= table[key].speed_interval[1]
      )
    })
  ]
}
