const express = require('express')
const app = express()
const port = 3000
const { User } = require('./models')
const axios = require('axios')

const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const { compareHash } = require('./helpers/bcrypt')
const { createToken } = require('./helpers/jwt')

app.post('/register', async (req, res, next) => {
  try {
    const { email, password, gender, age, weight, height, weeklyPhysicalActivity } = req.body
    const newUser = await User.create({
      email, password, age, weight, height, weeklyPhysicalActivity, gender
    })

    res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      status: newUser.status,
      dailyCalories: newUser.dailyCalories
    })

  } catch (error) {
    next(error)
  }
})

app.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email) {
      throw { name: 'noEmail' }
    }

    if (!password) {
      throw { name: 'noPassword' }
    }

    const user = await User.findOne({
      where: { email }
    })

    if (!user) {
      throw { name: 'invalidCredentials' }
    }

    const isValidPw = compareHash(password, user.password)
    if (!isValidPw) {
      throw { name: 'invalidCredentials' }
    }

    const payload = {
      id: user.id,
      email
    }
    const access_token = createToken(payload)

    res.status(200).json({
      access_token,
      email
    })

    req.headers = {
      access_token
    }


  } catch (error) {
    next(error)
  }
})

app.get('/food', async (req, res, next) => {
  try {
    const { item } = req.query

    const { data } = await axios({
      method: 'GET',
      url: `https://calorieninjas.p.rapidapi.com/v1/nutrition?query=${item}`,
      headers: {
        "x-rapidapi-key": "ce19d0164fmsh3d383efc0e85ce5p16dcb1jsnb1a4a3c79541",
        "x-rapidapi-host": "calorieninjas.p.rapidapi.com"
      }
    })

    // kalo makanan di atas treshold tertentu, kasih status merah
    // ada status merah, hijau, kuning


    if (data.items.length == 0) {
      throw {name: 'notFound'}
    }

    res.status(200).json(data.items[0])

  } catch (error) {
    next(error)
  }
})




const errorHandler = require('./middlewares/errorHandler')
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})