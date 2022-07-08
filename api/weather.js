const express = require("express")
const router = express.Router()
const request = require("request")
const PImage = require("pureimage")
const fs = require("fs")
const schedule = require("node-schedule")
const axios = require("axios")
const path = require("path")
let havesWeather = false
const options = {
  method: "GET",
  url: "https://openweathermap.org/data/2.5/weather?id=1277333&appid=439d4b804bc8187953eb36d2a8c26a02",
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36",
  },
}

// schedule.scheduleJob("0 0 * * * *", function () {
//   fetchAndSaveWeather()
// })

router.get("/", async (req, res) => {
  try {
    // res.sendFile("image.png", { root: "./" })

    axios(options)
      .then((response) => {
        const { data } = response
        console.log("pwd", process.cwd() + "/Menlo.tff")
        const fnt = PImage.registerFont("Menlo.ttf", "Menlo")
        fnt.load(() => {
          const img = PImage.make(450, 50)
          const ctx = img.getContext("2d")
          ctx.imageSmoothingEnabled = true
          ctx.fillStyle = "#000"
          ctx.font = "16pt"
          ctx.fillText(`Currently, ${data.weather[0].description}.`, 5, 40)
          ctx.fillText(
            `Today, ${data.main.temp}°C, ${data.weather[0].main}, ${data.name}`,
            5,
            20
          )
          PImage.encodePNGToStream(img, fs.createWriteStream("image.png"))
            .then(() => {
              console.log("Weather snapshot saved.")
              havesWeather = true
              res.sendFile("image.png", { root: "./" })
            })
            .catch((e) => {
              console.log("There was an error writing file.")
            })
        })
      })
      .catch((error) => {
        console.log("Error", error)
      })
  } catch (error) {
    console.error(error)
    return res.status(500).send("Server error")
  }
})

module.exports = router
