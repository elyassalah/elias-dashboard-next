import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    // cannot be negative price
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    // cannot be negative price
  },
  img: {
    type: String,
  },
  color: {
    type: String,
  },
  size: {
    type: String,
  },
  // createdAt: {
  //   type: Date,
  //   default:Date.now,
  // }
  // do not use created at cause timestamps bellow created it for us
},
  { timestamps: true }
);

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);