const database = require("./connection")
const bcrypt = require("bcrypt")
const { generateToken } = require("../middlewares/auth")

async function register(user) {
    try {
        const connection = await database()
        const [rows] = await connection.query("SELECT * FROM users WHERE username = ? OR email = ?", [user.username, user.email])

        if(rows.length > 0) {
            return { success: false, message:"User already exists" }
        } else {
            bcrypt.hash(user.password, 10, async (err, hash) => {
                await connection.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [user.username, user.email, hash])
            })
            return { success: true, message:"Registered successfully"}
        }
    } catch(err) {
        console.log(err)
    }
}

async function login(user, res) {
    try {
        const connection = await database()
        const [result] = await connection.query("SELECT * FROM users WHERE email = ?", [user.email])
        
        if(result.length < 1) {
            return { success: false, message: "User doesn't exists" }
        } else {
            const hash = result[0].password
            const match = await bcrypt.compare(user.password, hash)

            if(match) {
                const token = generateToken(result[0])
                res.cookie("login_token", token, {
                    secure: true
                })
                return { success: true, message: "Successfully logged in", type: "success" }
            } else {
                return { success: false, message: "Incorrect password", type: "error" }
            }
        }
    } catch(err) {
        console.log(err)
    }
}

module.exports = { register, login }
