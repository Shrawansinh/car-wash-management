import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
      unique: true,
      minlength: 3,
      maxlength: 50,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: 500,
    },

    prices: {
      bike: {
        type: Number,
        required: true,
        min: 0,
      },

      car: {
        type: Number,
        required: true,
        min: 0,
      },

      truck: {
        type: Number,
        required: true,
        min: 0,
      },

      eightTyreTruck: {
        type: Number,
        required: true,
        min: 0,
      },

      heavyVehicle: {
        type: Number,
        default: null,
      },
    },

    duration: {
      type: Number,
      required: true,
      min: 5,
    },

    features: [
      {
        type: String,
      },
    ],

    image: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Service", serviceSchema);