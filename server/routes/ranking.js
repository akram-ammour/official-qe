const express = require('express')
const router = express.Router()
const {
    getUserGlobalRanking,
    getUserModuleRanking,
    createUserPoints,
} = require("../controllers/ranking")

router.route("/:userId").get(getUserGlobalRanking).post(createUserPoints)

router.route("/:userId/:moduleId").get(getUserModuleRanking)

// router.route('/listing/:moduleId').get()
// router.route('/globalListing')


module.exports = router