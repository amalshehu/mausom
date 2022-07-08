const express = require("express")
const router = express.Router()
const PImage = require("pureimage")
const axios = require("axios")
const path = require("path")
const options = {
  method: "GET",
  url: "https://openweathermap.org/data/2.5/weather?id=1277333&appid=439d4b804bc8187953eb36d2a8c26a02",
}

const promise = axios(options)

router.get("/", async (req, res) => {
  try {
    promise.then((response) => {
      const { data } = response
      const file = path.join(process.cwd(), "/", "Menlo.ttf")
      const fnt = PImage.registerFont(file, "Menlo")
      fnt.load(() => {
        makeWeather(data, res)
      })
    })
  } catch (error) {
    return res.status(500).send("Server error")
  }
})

function makeWeather(data, res) {
  const img = PImage.make(450, 50)
  const ctx = img.getContext("2d")
  const c = parseFloat(data.main.temp) < 26 ? "#8ac926" : "#ff595e"
  ctx.fillStyle = c
  ctx.fillRect(0, 0, img.width, img.height)
  ctx.fillStyle = "#000"
  ctx.font = "16pt"
  ctx.fillText(`Today, ${data.weather[0].description}.`, 5, 40)
  ctx.fillText(
    `Currently, ${data.main.temp}°C, ${data.weather[0].main}, ${data.name}`,
    5,
    20
  )
  res.writeHead(200, {
    "Content-Type": "image/png",
  })
  PImage.encodePNGToStream(img, res)
}

module.exports = router
