import Booking from "../models/Booking.js";
import Customer from "../models/Customer.js";
import Service from "../models/Service.js";
import TimeSlot from "../models/TimeSlot.js";

// @desc    Get all bookings
// @route   GET /api/bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("customer")
      .populate("service")
      .populate("timeSlot");

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("customer")
      .populate("service")
      .populate("timeSlot");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create booking
// @route   POST /api/bookings
export const createBooking = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      vehicleBrand,
      vehicleNumber,
      vehicleType,
      serviceName,
      timeSlotId,
      bookingDate,
      notes,
    } = req.body;

    // ==========================================
    // 1. Validate required fields
    // ==========================================

    if (
      !name ||
      !phone ||
      !vehicleNumber ||
      !vehicleType ||
      !serviceName ||
      !timeSlotId ||
      !bookingDate
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required booking details",
      });
    }

    // ==========================================
    // 2. Find or create customer
    // ==========================================

    let customer = await Customer.findOne({ phone });

    if (!customer) {
      let customerVehicleType = vehicleType;

      // Match Booking vehicle type with Customer enum
      if (vehicleType === "8-Tyre Truck") {
        customerVehicleType = "8 wheeler truck";
      }

      if (vehicleType === "Heavy Vehicle") {
        customerVehicleType = "JCB";
      }

      customer = await Customer.create({
        fullName: name,
        phone,
        email: email || "",
        vehicleNumber,
        vehicleType: customerVehicleType,
      });
    }

    // ==========================================
    // 3. Find service
    // ==========================================

    const service = await Service.findOne({
      name: serviceName,
      isActive: true,
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // ==========================================
    // 4. Atomically reserve time slot
    // ==========================================
    // This prevents two users from booking
    // the same slot at the same time.

    const timeSlot = await TimeSlot.findOneAndUpdate(
      {
        _id: timeSlotId,
        isBooked: false,
      },
      {
        $set: {
          isBooked: true,
        },
      },
      {
        new: true,
      }
    );

    if (!timeSlot) {
      return res.status(409).json({
        success: false,
        message: "This time slot is already booked or does not exist",
      });
    }

    // ==========================================
    // 5. Calculate price from backend
    // ==========================================

    let totalAmount;

    switch (vehicleType) {
      case "Bike":
        totalAmount = service.prices.bike;
        break;

      case "Car":
        totalAmount = service.prices.car;
        break;

      case "Truck":
        totalAmount = service.prices.truck;
        break;

      case "8-Tyre Truck":
        totalAmount = service.prices.eightTyreTruck;
        break;

      case "Heavy Vehicle":
        totalAmount = service.prices.heavyVehicle;
        break;

      default:
        // Release the slot because booking cannot continue
        await TimeSlot.findByIdAndUpdate(timeSlot._id, {
          isBooked: false,
        });

        return res.status(400).json({
          success: false,
          message: "Invalid vehicle type",
        });
    }

    // ==========================================
    // 6. Heavy vehicle price validation
    // ==========================================

    if (
      totalAmount === null ||
      totalAmount === undefined
    ) {
      // Release the slot because booking cannot continue
      await TimeSlot.findByIdAndUpdate(timeSlot._id, {
        isBooked: false,
      });

      return res.status(400).json({
        success: false,
        message:
          "Please contact us for heavy vehicle pricing",
      });
    }

    // ==========================================
    // 7. Create booking
    // ==========================================

    let booking;

    try {
      booking = await Booking.create({
        customer: customer._id,
        service: service._id,
        vehicleType,
        timeSlot: timeSlot._id,
        bookingDate: new Date(bookingDate),
        totalAmount,
        status: "Pending",
        paymentStatus: "Pending",
      });
    } catch (error) {
      // ==========================================
      // Booking failed
      // Release the reserved slot
      // ==========================================

      await TimeSlot.findByIdAndUpdate(
        timeSlot._id,
        {
          isBooked: false,
        }
      );

      throw error;
    }

    // ==========================================
    // 8. Success response
    // ==========================================

    res.status(201).json({
      success: true,
      message:
        "Booking request submitted successfully. Our team will call you shortly to confirm availability.",
      data: booking,
    });
  } catch (error) {
    console.error("Booking Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update booking
// @route   PUT /api/bookings/:id
export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const oldStatus = booking.status;
    const newStatus = req.body.status;

    // Only update fields sent by frontend
    if (newStatus) {
      booking.status = newStatus;
    }

    if (req.body.paymentStatus) {
      booking.paymentStatus = req.body.paymentStatus;
    }

    await booking.save();

    // If booking is cancelled, release the time slot
    if (
      newStatus === "Cancelled" &&
      oldStatus !== "Cancelled"
    ) {
      await TimeSlot.findByIdAndUpdate(
        booking.timeSlot,
        {
          $set: {
            isBooked: false,
          },
        }
      );
    }

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Update Booking Error:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
// @desc    Delete booking
// @route   DELETE /api/bookings/:id
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(
      req.params.id
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get booking statistics for admin dashboard
// @route   GET /api/bookings/stats
export const getBookingStats = async (req, res) => {
  try {
    // ==========================================
    // Booking counts
    // ==========================================

    const totalBookings =
      await Booking.countDocuments();

    const pendingBookings =
      await Booking.countDocuments({
        status: "Pending",
      });

    const confirmedBookings =
      await Booking.countDocuments({
        status: "Confirmed",
      });

    const completedBookings =
      await Booking.countDocuments({
        status: "Completed",
      });

    const cancelledBookings =
      await Booking.countDocuments({
        status: "Cancelled",
      });

    // ==========================================
    // Today's date
    // ==========================================

    const today = new Date();

    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    // ==========================================
    // Today's bookings
    // ==========================================

    const todayBookings =
      await Booking.countDocuments({
        bookingDate: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });

    // ==========================================
    // Today's available slots
    // ==========================================

    const availableSlots =
      await TimeSlot.countDocuments({
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
        isBooked: false,
      });

    // ==========================================
    // Total customers
    // ==========================================

    const totalCustomers =
      await Customer.countDocuments();

    // ==========================================
    // Recent bookings
    // ==========================================

    const recentBookings = await Booking.find()
      .populate("customer")
      .populate("service")
      .populate("timeSlot")
      .sort({ createdAt: -1 })
      .limit(5);

    // ==========================================
    // Response
    // ==========================================

    res.status(200).json({
      success: true,
      data: {
        totalBookings,
        pendingBookings,
        confirmedBookings,
        completedBookings,
        cancelledBookings,
        todayBookings,
        availableSlots,
        totalCustomers,
        recentBookings,
      },
    });
  } catch (error) {
    console.error(
      "Get booking stats error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};