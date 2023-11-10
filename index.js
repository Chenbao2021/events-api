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

app.use(session({
    secret: "234",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 60 * 24 * 1000, // 设置Cookie的过期时间，单位为毫秒
        // httpOnly: true, // 将Cookie设置为只能通过HTTP协议访问
        secure: true, // 仅在HTTPS连接中传输Cookie
        sameSite: 'none', // 允许跨站点访问
      },
}))

app.use(bodyParse.json())

// var corsOption = {
//     origin: "*",
//     methods: ["put", "post", "get", "DELETE", "OPTIONS"], 
// }
// app.use(cors(corsOption));

app.use(cors({
    credentials: true,
    // origin: '*',
    origin: ["https://yuchenbao.com", "http://localhost:5174"],
    // origin: "https://yuchenbao.com",
    // origin: "http://localhost:5174",
    methods: ["POST", "GET", "OPTIONS"], 
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