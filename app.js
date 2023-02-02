const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")

app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(express.static("public/js"))
app.use(express.static("public/css"))
app.use(express.static("public/images"))


app.set("view engine","ejs")

const index = require("./routes/index")
const register = require("./routes/register")
const login = require("./routes/login")

app.use(index)
app.use(register)
app.use(login)

app.listen(5000, () => {
    console.log("server is running")
})
