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
// Give index to date and slot to avoid duplicated slots for the same data and slot 
timeSlotSchema.index({ date: 1,slot: 1},
  { unique: true }
)

export default mongoose.model("TimeSlot", timeSlotSchema);