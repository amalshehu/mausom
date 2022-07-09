const express = require("express")
const router = express.Router()
const PImage = require("pureimage")
const axios = require("axios")
const path = require("path")
const fs = require("fs")
const options = {
  method: "GET",
  url: "https://openweathermap.org/data/2.5/onecall?lat=12.9762&lon=77.6033&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02",
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
  const img = PImage.make(450, 70)
  const ctx = img.getContext("2d")
  const c = parseFloat(data.current.temp) < 24 ? "#269dc9" : "#f7ff59"
  ctx.fillStyle = c
  ctx.fillRect(0, 0, img.width, img.height)
  ctx.fillStyle = "#000"
  ctx.font = "16pt"
  ctx.fillText(
    `Feels like, ${data.current.feels_like}°C, ${data.current.weather[0].main}, Bangaluru`,
    5,
    20
  )
  ctx.fillText(`Today, ${data.current.weather[0].description}.`, 5, 40)
  ctx.fillText(`${Date(data.dt).toString().split("GMT")[0]}`, 5, 60)

  res.writeHead(200, {
    "Content-Type": "image/png",
  })
  PImage.encodePNGToStream(img, res)
}

module.exports = router
