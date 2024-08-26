const router = require("express").Router();
const userController = require("../controller/userController");
const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })
router.post("/signup", upload.single("file"), userController.signup);
router.get("/user", userController.user);

module.exports = router;
