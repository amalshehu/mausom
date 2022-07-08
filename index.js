const express = require("express")
const app = express()
const weather = require("./api/weather")
const PORT = process.env.PORT || 3000

app.use(express.json({ extended: false }))
app.use("/api/weather", weather)

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`))
