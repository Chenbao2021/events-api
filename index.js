const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParse = require('body-parser')
require('dotenv').config()

const routes = require('./route/EventRoute')

const connectDB = async () => {
    mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log('connected successfully'))
    .catch((err) => console.log('err = ', err))
}
connectDB();

const app = express()

app.use(cors())
app.use(bodyParse.json())
app.use(routes)

app.listen(process.env.PORT || 3000)