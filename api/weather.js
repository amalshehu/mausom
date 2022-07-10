const express = require("express")
const router = express.Router()
const PImage = require("pureimage")
const { registerFont, createCanvas, loadImage } = require("canvas")

const axios = require("axios")
const path = require("path")
const fs = require("fs")
const file = path.join(process.cwd(), "/", "Menlo.ttf")

registerFont(file, { family: "Menlo" })
const options = {
  method: "GET",
  url: "https://openweathermap.org/data/2.5/onecall?lat=12.9762&lon=77.6033&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02",
}

const promise = axios(options)

router.get("/", async (req, res) => {
  try {
    promise.then((response) => {
      const { data } = response
      const fnt = PImage.registerFont(file, "Menlo")
      fnt.load(() => {
        makeWeather(data, res)
      })
    })
  } catch (error) {
    return res.status(500).send("Server error")
  }
})

router.get("/image", async (req, res) => {
  try {
    promise.then((response) => {
      const { data } = response
      makeWeather2(data, res)
    })
  } catch (error) {
    return res.status(500).send("Server error")
  }
})

async function makeWeather2(data, res) {
  const canvas = createCanvas(1200, 800)
  const ctx = canvas.getContext("2d")
  ctx.imageSmoothingEnabled = false

  canvas.shadowColor = "rgba(0, 0, 0, 0.5)"
  canvas.shadowOffsetX = 4
  canvas.shadowOffsetY = 4
  canvas.shadowBlur = 5

  ctx.font = '24px "Comic Sans"'
  const c = parseFloat(data.current.temp) < 24 ? "#269dc9" : "#f7ff59"
  ctx.fillStyle = c
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = "#000"
  ctx.fillText(
    `Feels like, ${data.current.feels_like}°C, ${data.current.weather[0].main}, Bangaluru`,
    10,
    100
  )
  const weatherIcon = await loadImage(
    `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
  )
  ctx.drawImage(weatherIcon, 0, 0, 100, 100)
  console.log(weatherIcon)
  ctx.fillText(`Today, ${data.current.weather[0].description}.`, 10, 200)
  ctx.fillText(`${Date(data.dt).toString().split("GMT")[0]}`, 10, 300)
  console.log(Object.keys(data))
  // ctx.fillText(`${data.alerts[0].event}`, 10, 400)
  res.writeHead(200, {
    "Content-Type": "image/png",
  })
  res.end(canvas.toBuffer("image/png"))
}
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
