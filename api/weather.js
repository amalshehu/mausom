const path = require("path")
const fs = require("fs")
const express = require("express")
const router = express.Router()
const moment = require("moment-timezone")
const axios = require("axios")
const { registerFont, createCanvas, loadImage } = require("canvas")
const wind = require("./util")

const file = path.join(process.cwd(), "/", "Menlo.ttf")
registerFont(file, { family: "Menlo" })
const options = {
  method: "GET",
  url: "https://openweathermap.org/data/2.5/onecall?lat=12.9762&lon=77.6033&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02",
}
const promise = axios(options)

router.get("/card", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress
  console.log(`${ip} requested card`)
  try {
    promise.then((response) => {
      const { data } = response
      makeWeather(data, res)
    })
  } catch (error) {
    return res.status(500).send("Server error")
  }
})

async function makeWeather(data, res) {
  const canvas = makeCanvas()
  const { windType, ctx } = await createCard(canvas, data)
  const desc = windType.desc.trim()
  ctx.font = '16px "Menlo"'
  ctx.fillText(desc, 10, 170)

  res.writeHead(200, {
    "Content-Type": "image/png",
    "Cache-Control": "public, max-age=0",
  })
  res.end(canvas.toBuffer("image/png"))
}

function makeCanvas() {
  const canvas = createCanvas(1000, 185)
  canvas.shadowColor = "rgba(0, 0, 0, 0.71)"
  canvas.shadowOffsetX = 8
  canvas.shadowOffsetY = 8
  canvas.shadowBlur = 5
  return canvas
}

async function createCard(canvas, data) {
  const ctx = canvas.getContext("2d")
  ctx.imageSmoothingEnabled = true
  ctx.fillStyle = "#0E1117"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const windType = wind(data.current.wind_speed)

  const weatherIcon = await loadImage(
    `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
  )
  const dt = moment(data.dt).tz("Asia/Kolkata").format("MMMM DD hh:mm a")
  ctx.fillStyle = "#fff"
  ctx.font = '30px "Menlo"'
  ctx.drawImage(weatherIcon, 0, -15, 100, 100)
  ctx.fillText(`${data.current.temp}°C`, 100, 50)
  ctx.font = '12px "Menlo"'
  ctx.fillText(dt, 12, 90)
  ctx.font = '20px "Menlo"'
  ctx.fillText(`Bengaluru, IN`, 10, 115)
  ctx.font = '22px "Menlo"'
  ctx.fillText(
    `Feels like, ${data.current.feels_like}°C, ${data.current.weather[0].main}, ${windType.key}`,
    10,
    150
  )
  return { windType, ctx }
}

function makeAlive() {
  axios.get("https://www.wikipedia.org").then((res) => {
    if (res) console.log("ping success")
  })
  setTimeout(makeAlive, 5000)
}

makeAlive()

module.exports = router
