const express = require('express')
const router = express.Router()

const {
createCourse,
getAllCourses,
deleteCourse,
updateCourse,
getCourse,
getModuleCourses,
test
} = require('../controllers/courses')

const verifyRole = require("../middlewares/verifyRole")



router.route("").get(verifyRole("ADMIN"),getAllCourses).post(verifyRole("ADMIN"),createCourse)

// get courses li f a module given a modduleId
router.route("/specific").get(verifyRole("ADMIN"),getModuleCourses)

router.route("/:id").delete(verifyRole("ADMIN"),deleteCourse).patch(verifyRole("ADMIN"),updateCourse).get(verifyRole("ADMIN"),getCourse)

router.route("/test/hi").get(test)


module.exports = router