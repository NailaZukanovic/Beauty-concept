const express = require("express");
const router = express.Router();
const { Category } = require("../models/category");

//GET ALL category method
router.get(`/`, async (req, res) => {
  const categoryList = await Category.find();
  if (!categoryList) {
    res.status(500).json({
      success: false,
    });
  }
  res.status(200).send(categoryList);
});

//GET SINGLE category method
router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(500).json({
      message: "The category with the given ID was not found",
    });
  }
  res.status(200).send(category);
});
module.exports = router;
