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
app.use(bodyParse.json())

// var corsOption = {
//     origin: "*",
//     methods: ["put", "post", "get", "DELETE", "OPTIONS"], 
// }
// app.use(cors(corsOption));

app.use(cors({
    credentials: true,
    origin: "https://yuchenbao.com",
    // origin: "http://localhost:5174",
    methods: ["POST", "GET",], 
}))

app.use(session({
    secret: "itcas",
    name: 'sessionId',
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: 'none',
        // secure: true,
        path: '/',
        // httpOnly: true,
        maxAge: 60 * 60 * 24 * 1000,
        // rolling:true,//true在每次请求或刷新时强制设置cookie，将重置cookie的过期时间（默认false）
      },
}))

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