const express = require("express")
const { login } = require("../database/queries")
const router = express.Router()

router.get("/login", (req, res) => {
    res.render("login", { message: "", type: "" })
})

router.post("/login", async (req, res) => {
    const result = await login(req.body, res)

    if(result.success) {
        console.log(result.message)
        res.redirect("/")
    } else {
        console.log(result.message)
        res.render("login", { message: result.message, type: result.type })
    }
})


module.exports = router