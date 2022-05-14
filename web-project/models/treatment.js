const mongoose = require("mongoose");

const treatmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});
treatmentSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

treatmentSchema.set("toJSON", {
  virtuals: true,
});

exports.Treatment = mongoose.model("Treatment", treatmentSchema);
