require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000
const router = require('./routes');

const cors = require("cors");
app.use(express.json())
app.use(cors());

app.use(express.urlencoded({ extended: false }))

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })
app.use(router)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})