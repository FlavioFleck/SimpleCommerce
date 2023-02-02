const jwt = require("jsonwebtoken")

function generateToken(user) {
    return jwt.sign({user_id: user.id}, "secret", {expiresIn: 300})
}

function auth(req, res, next) {
    const token = req.cookies.login_token
    try {
        jwt.verify(token, "secret", (err, decode) => {
            req.user_id = decode.user_id
        })
        next()
    } catch(err) {
        res.clearCookie("login_token")
        next()
    }
}

module.exports = { generateToken, auth }