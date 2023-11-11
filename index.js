const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParse = require('body-parser')
const session = require('express-session')

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
app.use(cors({
    credentials: true,
    origin: ["https://yuchenbao.com", "http://localhost:5174"],
}))

app.use(session({
    secret: "1234",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 60 * 1000, 
        secure: true, 
        sameSite: 'none' 
      },
}))


app.use(bodyParse.json())


// app.use('./save', (req, res, next) => {
//     console.log("Middle ware, = ", req.session.user);
//     if(!req.session.user && req.url !== "/login") {
//         req.session.user = req.body;
//         res.redirect(`/login`);
//     } else {
//         console.log('else');
//         // next();
//     }
// })

app.use(routes)

app.listen(process.env.PORT || 3000)