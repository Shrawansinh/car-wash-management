import TimeSlot from "../models/TimeSlot.js";

// @desc    Get all time slots
// @route   GET /api/timeslots
export const getAllSlots = async (req, res) => {
  try {
    const slots = await TimeSlot.find();

    res.status(200).json({
      success: true,
      count: slots.length,
      data: slots,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single time slot
// @route   GET /api/timeslots/:id
export const getSlotById = async (req, res) => {
  try {
    const slot = await TimeSlot.findById(req.params.id);

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: "Time slot not found",
      });
    }

    res.status(200).json({
      success: true,
      data: slot,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create time slot
// @route   POST /api/timeslots
export const createSlot = async (req, res) => {
  try {
    const slot = await TimeSlot.create(req.body);

    res.status(201).json({
      success: true,
      message: "Time slot created successfully",
      data: slot,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update time slot
// @route   PUT /api/timeslots/:id
export const updateSlot = async (req, res) => {
  try {
    const slot = await TimeSlot.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: "Time slot not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Time slot updated successfully",
      data: slot,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete time slot
// @route   DELETE /api/timeslots/:id
export const deleteSlot = async (req, res) => {
  try {
    const slot = await TimeSlot.findByIdAndDelete(req.params.id);

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: "Time slot not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Time slot deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};