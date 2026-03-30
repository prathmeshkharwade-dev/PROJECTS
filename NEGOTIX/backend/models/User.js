import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { 
      type: String, 
      required: true, 
      unique: true // Ensure no two users have the same username
    },
    email: { 
      type: String, 
      required: true, 
      unique: true // Ensure no two users have the same email
    },
    password: { 
      type: String, 
      required: true 
    },
  },
  { 
    timestamps: true // Automatically adds createdAt and updatedAt fields
  }
);

export default mongoose.model("User", userSchema);