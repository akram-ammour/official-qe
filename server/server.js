require("dotenv").config()
const express = require("express")
const cors = require("cors")
const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser")
const verifyJwt = require("./middlewares/verifyJwt")
const verifyRevoke = require("./middlewares/verifyRevokingRefreshToken")


const app = express()
const modules = require("./routes/modules")
const courses = require("./routes/courses")
const questions = require("./routes/questions")
const auth = require("./routes/auth")
const exams = require("./routes/Exams")
const users = require("./routes/users")
const ranking = require("./routes/ranking")
const images = require("./routes/images")

// app.use(express.static('public'));

app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
    origin:[`${process.env.BASE_URL}`],
    methods:["POST",'GET',"PATCH","DELETE"],
    credentials:true
    }
))

// app.use("/users",users)
// app.use("/")
app.use(express.static("public"))
app.use("/auth",auth)

app.use(verifyJwt) // these routes are protected with jwt
app.use(verifyRevoke)
app.use("/exams",exams)
app.use("/modules",modules)
app.use("/courses",courses)
app.use("/questions",questions)
app.use("/users",users)
app.use("/ranking",ranking)
app.use("/images",images)

app.listen(process.env.PORT,()=>{
    console.log(`listening at port ${process.env.PORT}`)
})
// ------------------------------previous
// require("dotenv").config()
// const express = require("express")
// const cors = require("cors")
// const jwt = require('jsonwebtoken')
// const cookieParser = require("cookie-parser")


// const app = express()
// const modules = require("./routes/modules")
// const courses = require("./routes/courses")
// const questions = require("./routes/questions")
// const auth = require("./routes/auth")
// const exams = require("./routes/Exams")

// app.use(express.json())
// app.use(cookieParser())
// app.use(cors(
//     {
//     origin:[`http://localhost:3000`],
//     methods:["POST",'GET'],
//     credentials:true
//     }
// ))

// // app.use("/users",users)
// // app.use("/")

// app.use("/modules",modules)
// app.use("/courses",courses)
// app.use("/questions",questions)
// app.use("/auth",auth)
// app.use("/exams",exams)

// app.listen(process.env.PORT,()=>{
//     console.log("listening at port 5000")
// })