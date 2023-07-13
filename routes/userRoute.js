const { checkUser, superAuth, authenticate } = require("../controllers/authorization");
const {userSignUp,userLogin,signOut,oneUser, allUsers, Admin,update, deleteUser} = require("../controllers/userController")
const router = require("express").Router();
router.route("/").get((req, res)=>{
    res.json("Welcome to my uthentification/authorization api homepage")
})
router.route("/signup").post(userSignUp);

router.route("/login").post(userLogin)

router.route("/:id/allUser").get(checkUser, allUsers)

router.route("/:id/allUser/:userId").get(checkUser,oneUser)

router.route("/:id/admin/:adminId").patch(superAuth, Admin)

router.route("/renew/:id/:userId").patch(checkUser, update)

router.route("/delete/:id/:userId").delete(checkUser, deleteUser)

router.route("/users/sign-out").post(signOut)

router.route("/logout/:id").post(authenticate, signOut)


module.exports = router