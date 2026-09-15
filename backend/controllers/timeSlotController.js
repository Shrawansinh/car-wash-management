import TimeSlot from "../models/TimeSlot.js";

// Normalize time slot
// Example:
// "9:00 AM"      -> "09:00 AM"
// " 9:00 AM "    -> "09:00 AM"
// "09:00  AM"    -> "09:00 AM"
const normalizeSlot = (slot) => {
  if (!slot) return "";

  return slot
    .trim()
    .replace(/\s+/g, " ")
    .replace(/^(\d):/, "0$1:");
};

// @desc    Get all time slots
// @route   GET /api/timeslots
export const getAllSlots = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });
    }

    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const slots = await TimeSlot.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).sort({ slot: 1 });

    res.status(200).json({
      success: true,
      count: slots.length,
      data: slots,
    });
  } catch (error) {
    console.error("Get all slots error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Generate daily time slots
// @route   POST /api/timeslots/generate
export const generateDailySlots = async (req, res) => {
  try {
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });
    }

    const slots = [
      "09:00 AM",
      "10:00 AM",
      "11:00 AM",
      "12:00 PM",
      "01:00 PM",
      "02:00 PM",
      "03:00 PM",
      "04:00 PM",
      "05:00 PM",
      "06:00 PM",
    ];

    const slotData = slots.map((slot) => ({
      slot: normalizeSlot(slot),
      date: new Date(date),
      isBooked: false,
    }));

    try {
      const createdSlots = await TimeSlot.insertMany(slotData);

      return res.status(201).json({
        success: true,
        message: "Daily time slots created successfully",
        count: createdSlots.length,
        data: createdSlots,
      });
    } catch (error) {
      // Duplicate slot already exists
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "Some or all time slots already exist for this date",
        });
      }

      throw error;
    }
  } catch (error) {
    console.error("Generate daily slots error:", error);

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
    console.error("Get slot by id error:", error);

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
    const { slot, date } = req.body;

    if (!slot || !date) {
      return res.status(400).json({
        success: false,
        message: "Slot and date are required",
      });
    }

    const normalizedSlot = normalizeSlot(slot);

    const newSlot = await TimeSlot.create({
      slot: normalizedSlot,
      date: new Date(date),
      isBooked: false,
    });

    res.status(201).json({
      success: true,
      message: "Time slot created successfully",
      data: newSlot,
    });
  } catch (error) {
    console.error("Create slot error:", error);

    // MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "This time slot already exists for this date",
      });
    }

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
    const { slot } = req.body;

    if (!slot) {
      return res.status(400).json({
        success: false,
        message: "Time slot is required",
      });
    }

    // Find existing slot first
    const existingSlot = await TimeSlot.findById(req.params.id);

    if (!existingSlot) {
      return res.status(404).json({
        success: false,
        message: "Time slot not found",
      });
    }

    // Do not allow changing booked slot
    if (existingSlot.isBooked) {
      return res.status(400).json({
        success: false,
        message: "Booked time slot cannot be updated",
      });
    }

    const normalizedSlot = normalizeSlot(slot);

    const updatedSlot = await TimeSlot.findByIdAndUpdate(
      req.params.id,
      {
        slot: normalizedSlot,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Time slot updated successfully",
      data: updatedSlot,
    });
  } catch (error) {
    console.error("Update slot error:", error);

    // MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "This time slot already exists for this date",
      });
    }

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
    const existingSlot = await TimeSlot.findById(req.params.id);

    if (!existingSlot) {
      return res.status(404).json({
        success: false,
        message: "Time slot not found",
      });
    }

    // Do not allow deleting booked slot
    if (existingSlot.isBooked) {
      return res.status(400).json({
        success: false,
        message: "Booked time slot cannot be deleted",
      });
    }

    await TimeSlot.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Time slot deleted successfully",
    });
  } catch (error) {
    console.error("Delete slot error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};