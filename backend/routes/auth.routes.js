const express = require("express");
const router = express.Router();
const { validateAdminLogin } = require("../middlewares/auth.middlewares");
const { adminLogin } = require("../controllers/auth.controllers");

router.post("/admin-login", validateAdminLogin, adminLogin);

module.exports = router
