import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    username: { 
      type: String, 
      required: true 
    },
    score: { 
      type: Number, 
      required: true 
    },
    
    productName: { 
      type: String, 
      default: "Unknown Product" 
    },
    savedAmount: { 
      type: Number, 
      default: 0 
    },
    rounds: { 
      type: Number, 
      default: 0 
    },
    difficulty: { 
      type: String, 
      default: "medium" 
    },
  },
  { 
    timestamps: true 
  }
);

export default mongoose.model("Score", scoreSchema);