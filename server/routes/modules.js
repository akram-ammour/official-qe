const express =require("express")
const router = express.Router()
const {
    getallModules,
    createModule,
    getSpecific,
    updateModule,
    deleteModule,
    getModule,
    getUserModules,
    getCoursesExams,
    getProgress
} = require("../controllers/modules")

// what i want to do with querying the modules 
/*
if i want to enter the data of the exams i should make a sub app 
for anass where he can enter the data the subdata is
gonna have a page where the user can create modules
a page where he can create the courses for that module
a page where he can create exams for that modules
    the exam area he 
*/
const verifyRole = require("../middlewares/verifyRole")


//! i m not using the getallModules
router.route("/").get(verifyRole("ADMIN"),getallModules).post(verifyRole("ADMIN"),createModule)

//? i m using it in the selects to query the specific modules
//? of a year and semester 
router.route("/specific").get(verifyRole("ADMIN"),getSpecific)
// router.route("/get-modules").post(getUserModules)
router.route("/:id").patch(verifyRole("ADMIN"),updateModule).delete(verifyRole("ADMIN"),deleteModule).get(verifyRole("ADMIN"),getModule)

// router.route("/get-course-exam").post(getCoursesExams)

module.exports = router