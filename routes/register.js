const express = require("express")
const router = express.Router()
const { register } = require("../database/queries")

router.get("/register", (req, res) => {
    res.render("register")
})

router.post("/register", async (req, res) => {
    const result = await register(req.body)

    if(result.success) {
       console.log(result.message)
       res.redirect("/login")
    } else {
        console.log(result.message)
        res.redirect("/register")
    }
})


module.exports = router