const express = require("express");

const { registerUser,recognizeUser,verifyOtp} = require("../controller/authController");

const router = express.Router();

router.post("/register", registerUser);
router.get("/recognize", recognizeUser);
router.post("/verify-otp", verifyOtp);

module.exports = router;