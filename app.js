const express = require("express")
const app = express()
const port = 3700
const router = require("./routers") 
require('dotenv').config()


app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/", router)

app.listen(port, ()=>{
    console.log(`server run on port ${port}`);
})

