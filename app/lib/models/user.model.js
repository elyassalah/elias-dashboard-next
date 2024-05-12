import mongoose from "mongoose";

// const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|outlook|icloud)\.(com|org|net)$/i;
const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@(gmail|outlook|icloud)\.(com|org|net)$/, "i");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    $regex: emailRegex,
    // match: emailRegex, // Use 'match' instead of 'validate' for simpler validation
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
},
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
