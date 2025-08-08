const express = require("express");
const router = express.Router();
const { register, login, verifyToken, forgotPassword, resetPassword } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/verify", authMiddleware, verifyToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
