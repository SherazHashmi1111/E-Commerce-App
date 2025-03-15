const express = require("express");
const {
    registerUser
} = require("../../controllers/auth-controller/auth-controller");

const router = express.Router();

router.post("/register", registerUser);

module.exports = router;
