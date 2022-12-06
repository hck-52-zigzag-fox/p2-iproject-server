require("dotenv").config();
const cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routers = require('./routes')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(routers)

app.listen(port,() => {
  console.log(`app launching on port  ${port}`)
})
