const express = require('express')
const app = express()
const port = 3000
const { User, Food, foodLog } = require('./models')
const axios = require('axios')

const authentication = require('./middlewares/authentication')
const errorHandler = require('./middlewares/errorHandler')

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

    if (data.items.length == 0) {
      throw { name: 'notFound' }
    }

    const result = await Food.create({
      name: data.items[0].name,
      sugarG: data.items[0].sugar_g,
      fiberG: data.items[0].fiber_g,
      sodiumMg: data.items[0].sodium_mg,
      potassiumMg: data.items[0].potassium_mg,
      saturatedFatG: data.items[0].fat_saturated_g,
      totalFatG: data.items[0].fat_total_g,
      calories: data.items[0].calories,
      cholesterolMg: data.items[0].cholesterol_mg,
      proteinG: data.items[0].protein_g,
      carbsTotalG: data.items[0].carbohydrates_total_g
    })


    res.status(200).json(result)

  } catch (error) {
    next(error)
  }
})

app.use(authentication)

app.post('/foodlogs/:id', async (req, res, next) => {
  try {

    const UserId = req.user.id
    const FoodId = req.params.id

    const food = await Food.findByPk(FoodId)
    if (!food) {
      throw { name: 'notFound' }
    }

    await foodLog.create({
      UserId, FoodId
    })

    res.status(201).json({
      message: `${food.name} has been added to your food log`
    })


  } catch (error) {
    next(error)
  }
})



app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})