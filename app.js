const express = require("express")
const app = express()
const port = process.env.PORT || 3700
const router = require("./routers") 
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    }
    
const cors = require("cors")

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use("/", router)

app.listen(port, ()=>{
    console.log(`server run on port ${port}`);
})

