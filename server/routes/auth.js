const express = require('express')
const router = express.Router()
const {
    login,
    register,
    getUser,
    logout,
    refreshToken,
    autoLogin
} = require('../controllers/auth')

const verifyJwt = require("../middlewares/verifyJwt")

router.route("/login").post(login)
router.route("/register").post(register)
router.route("/user").get(verifyJwt,getUser)
router.route("/").get(autoLogin)
router.route("/logout").get(logout)
router.route("/refresh").get(refreshToken)



module.exports = router