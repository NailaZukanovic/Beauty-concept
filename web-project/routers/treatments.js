const express = require("express");
const mongoose = require("express");
const Category = require("../models/category");
const Treatment = require("../models/treatment");
const router = express.Router();

//get single treatment
router.get("/:id", async (req, res) => {
  const treatment = await Treatment.findById(req.params.id);
  if (!treatment) {
    res.status(500).json({
      success: false,
    });
  }
  res.send(treatment);
});

//GET method
router.get(`/`, async (req, res) => {
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }

  const treatmentList = await Treatment.find(filter).populate("category");
  res.send(treatmentList);
  // which path is diplayed response, also we can create some request when we need to displayed data of some user etc
  if (!treatmentList) {
    res.status(500).json({
      success: false,
    });
  }
});

module.exports = router;
