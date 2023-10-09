const express = require("express");
const router = express.Router();
// pk_live_8E9201350998115F
const MAGIC_PUBLISHABLE_KEY = "pk_live_8E9201350998115F";

// GET home page
router.get("/", (req, res) => {
  res.render("index", { title: "Magic Apple Store 🍎", MAGIC_PUBLISHABLE_KEY });
});

module.exports = router;
