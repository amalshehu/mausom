const wind = (speed) => {
  const table = {
    Calm: {
      speed_interval: [0, 0.3],
      desc: "Smoke rises straight up",
    },
    "Light air": {
      speed_interval: [0.3, 1.6],
      desc: "One can see downwind of the smoke drift",
    },
    "Light breeze": {
      speed_interval: [1.6, 3.4],
      desc: "One can feel the wind. The leaves on the trees move, the wind can lift small streamers.",
    },
    "Gentle Breeze": {
      speed_interval: [3.4, 5.5],
      desc: "Leaves and twigs move. Wind extends light flag and pennants",
    },
    "Moderate breeze": {
      speed_interval: [5.5, 8],
      desc: "The wind raises dust and loose papers, touches on the twigs and small branches.",
    },
    "Fresh Breeze": {
      speed_interval: [8, 10.8],
      desc: "Small trees in leaf begin to sway. The water begins little waves to peak.",
    },
    "Strong breeze": {
      speed_interval: [10.8, 13.9],
      desc: "Large branches and smaller tribes moves. Difficult to use umbrella. A resistance when running.",
    },
    "High wind, near gale": {
      speed_interval: [13.9, 17.2],
      desc: "Whole trees in motion. It is hard to go against the wind.",
    },
    Gale: {
      speed_interval: [17.2, 20.7],
      desc: "The wind break twigs of trees. It is hard to go against the wind.",
    },
    "Severe Gale": {
      speed_interval: [20.8, 24.5],
      desc: "All large trees swaying and throws. Tiles can blow down.",
    },
    Storm: {
      speed_interval: [24.5, 28.5],
      desc: "Rare inland. Trees uprooted. Serious damage to houses.",
    },
    "Violent Storm": {
      speed_interval: [28.5, 32.7],
      desc: "Occurs rarely and is followed by destruction.",
    },
    Hurricane: {
      speed_interval: [32.7, 64],
      desc: "Occurs very rarely. Unusually severe damage.",
    },
  }

  const key = Object.keys(table).find((key) => {
    return (
      speed >= table[key].speed_interval[0] &&
      speed <= table[key].speed_interval[1]
    )
  })
  return {
    key,
    desc: table[key].desc,
  }
}

module.exports = wind
