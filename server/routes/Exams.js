const express = require('express')
const router = express.Router()

const {
getExam,
createExam,
deleteExam,
updateExam,
createOption,
deleteOption,
getOption,
updateOption
} = require('../controllers/Exams')


// router.route("/create-exam").post(postExam)
// when i complete this api make sure to add the 
//! verifyRole("ADMIN")
const verifyRole = require("../middlewares/verifyRole")


router.route("/search").get(verifyRole("ADMIN"),getExam)
// exams/create
router.route("/create").post(verifyRole("ADMIN"),createExam) // create Exam works
router.route("/delete/:id").delete(verifyRole("ADMIN"),deleteExam)
// exams/update/:id
router.route("/update/:id").patch(verifyRole("ADMIN"),updateExam)

// exams/option/:id
router.route("/option/:id").get(verifyRole("ADMIN"),getOption).patch(verifyRole("ADMIN"),updateOption).delete(verifyRole("ADMIN"),deleteOption)
// exams/option/question/:id
router.route("/option/question/:id").post(verifyRole("ADMIN"),createOption)

module.exports = router