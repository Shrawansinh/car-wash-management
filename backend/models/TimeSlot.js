import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema(
  {
    slot: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("TimeSlot", timeSlotSchema);