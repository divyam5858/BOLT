const express = require("express");

const {
  submitCheckout,
} = require("../controller/checkoutController");

const router = express.Router();

router.post("/", submitCheckout);

module.exports = router;