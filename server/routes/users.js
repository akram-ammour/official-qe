const express = require("express")
const router = express.Router()
const {
    // getAllUsers,
    getUsers,
    editUserPassword,
    DeleteUser,
    createUser,
    UpdateUser,
    getUser,
    updateUserDates,
    resetDate
} = require("../controllers/users")


const verifyRole = require("../middlewares/verifyRole")

router.route("/").post(verifyRole("ADMIN"),createUser)
router.route("/password").patch(verifyRole("ADMIN"),editUserPassword)
router.route("/search").get(verifyRole("ADMIN"),getUsers)
//? user cannot be deleted if admin 
router.route("/:id").patch(verifyRole("ADMIN"),UpdateUser).get(verifyRole("ADMIN"),getUser).delete(verifyRole("ADMIN"),DeleteUser)
// userId
router.route("/date/:id/:sem").patch(updateUserDates)
router.route("/date/reset").post(resetDate)
module.exports = router