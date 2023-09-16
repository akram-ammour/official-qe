const express = require('express')
const router = express.Router()

const {
    // i get course's questions
    getQuestionsFromCourse,
    // i get course's exams
    getQuestionsFromExam,

    //Get Post Delete User Answers
    postUserAnswers,
    getUserAnswers,
    resetUserAnswers,
    
    //Get Post Delete User Progress
    postUserProgress,
    getUserProgress,
    resetUserProgress,
    
    test,
    getUserStats,
    getUserSpecModuleStats,
    
    postQuestionStats

} = require("../controllers/questions")

// get questions from course Id
router.route("/:id/course").get(getQuestionsFromCourse)

// get questions from exam Id
router.route("/:id/exam").get(getQuestionsFromExam)


// i need to make a route for querying the progress and the answers 
// i guess i don't need the progress in the question components 
// i only need the progress in the progressSidelay component exactly

router.route("/answers").post(postUserAnswers).get(getUserAnswers)
router.route("/answers/reset").post(resetUserAnswers)

router.route("/progress").post(postUserProgress).get(getUserProgress)
router.route("/progress/reset").post(resetUserProgress)

router.route("/progress/stats/:userId").get(getUserStats)
router.route("/progress/stats").get(getUserSpecModuleStats)

router.route("/userProgress").post(postQuestionStats)


// router.route("/test").get(test)

module.exports = router