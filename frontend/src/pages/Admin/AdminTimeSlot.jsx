import { useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaEdit,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

import api from "../../api/api";
import { useToast } from "../../componenets/Toast/ToastCongtext";
const AdminTimeSlots = () => {
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [slotTime, setSlotTime] = useState("");

  const [editingSlot, setEditingSlot] = useState(null);
  const { showToast } = useToast();
  // =========================
  // Fetch Slots
  // =========================
  const fetchSlots = async (date) => {
    if (!date) {
      setSlots([]);
      return;
    }

    try {
      setLoading(true);

      const response = await api.get(
        `/timeslots?date=${date}`
      );

      setSlots(response.data.data || []);
    } catch (error) {
      console.error("Fetch slots error:", error);

      showToast(
        error.response?.data?.message ||
          "Failed to load time slots",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Date Change
  // =========================
  const handleDateChange = (e) => {
    const date = e.target.value;

    setSelectedDate(date);

    fetchSlots(date);
  };

  // =========================
  // Create Slot
  // =========================
  const handleCreateSlot = async (e) => {
    e.preventDefault();

    if (!selectedDate) {
      showToast("Please select a date", "error");
      return;
    }

    if (!slotTime.trim()) {
      showToast("Please enter time slot", "error");
      return;
    }

    try {
      await api.post("/timeslots", {
        slot: slotTime,
        date: selectedDate,
      });

      showToast("Time slot created successfully", "success");

      setSlotTime("");
      setShowForm(false);

      fetchSlots(selectedDate);
    } catch (error) {
      console.error("Create slot error:", error);

      showToast(
        error.response?.data?.message ||
          "Failed to create time slot",
        "error"
      );
    }
  };

  // =========================
  // Edit Slot
  // =========================
  const handleEdit = (slot) => {
    setEditingSlot(slot);
    setSlotTime(slot.slot);
    setShowForm(true);
  };

  // =========================
  // Update Slot
  // =========================
  const handleUpdateSlot = async (e) => {
    e.preventDefault();

    if (!slotTime.trim()) {
      showToast("Please enter time slot", "error");
      return;
    }

    try {
      await api.put(
        `/timeslots/${editingSlot._id}`,
        {
          slot: slotTime,
        }
      );

      showToast("Time slot updated successfully", "success");

      setEditingSlot(null);
      setSlotTime("");
      setShowForm(false);

      fetchSlots(selectedDate);
    } catch (error) {
      console.error("Update slot error:", error);

      al(
        error.response?.data?.message ||
          "Failed to update time slot"
      );
    }
  };

  // =========================
  // Delete Slot
  // =========================
  const handleDelete = async (slotId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this time slot?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/timeslots/${slotId}`);

      showToast("Time slot deleted successfully", "success");

      fetchSlots(selectedDate);
    } catch (error) {
      console.error("Delete slot error:", error);

      showToast(
        error.response?.data?.message ||
          "Failed to delete time slot",
        "error"
      );
    }
  };

  // =========================
  // Close Form
  // =========================
  const closeForm = () => {
    setShowForm(false);
    setEditingSlot(null);
    setSlotTime("");
  };

  return (
    <div>
      {/* =========================
          Header
      ========================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Time Slots{" "}
            <span className="text-sky-400">
              Management
            </span>
          </h1>

          <p className="text-slate-400 mt-2">
            Create and manage booking time slots.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingSlot(null);
            setSlotTime("");
            setShowForm(true);
          }}
          className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-xl font-medium transition"
        >
          <FaPlus />
          Add Time Slot
        </button>
      </div>

      {/* =========================
          Date Selection
      ========================= */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <FaCalendarAlt className="text-sky-400" />

          <label className="text-sm font-medium text-slate-300">
            Select Date
          </label>
        </div>

        {/* IMPORTANT:
            White background keeps native date picker
            clearly visible in browser.
        */}
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="bg-white text-black border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
        />
      </div>

      {/* =========================
          Add / Edit Form
      ========================= */}
      {showForm && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white">
                {editingSlot
                  ? "Edit Time Slot"
                  : "Add Time Slot"}
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {editingSlot
                  ? "Update the selected time slot."
                  : "Create a new booking time slot."}
              </p>
            </div>

            <button
              type="button"
              onClick={closeForm}
              className="text-slate-500 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>

          {!selectedDate && !editingSlot && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 rounded-xl px-4 py-3 mb-5 text-sm">
              Please select a date before creating a
              time slot.
            </div>
          )}

          <form
            onSubmit={
              editingSlot
                ? handleUpdateSlot
                : handleCreateSlot
            }
            className="flex flex-col md:flex-row gap-4"
          >
            {/* Time */}
            <div className="flex-1">
              <label className="block text-sm text-slate-400 mb-2">
                Time Slot
              </label>

              <div className="relative">
                <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                <input
                  type="text"
                  value={slotTime}
                  onChange={(e) =>
                    setSlotTime(e.target.value)
                  }
                  placeholder="09:00 AM - 10:00 AM"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-white outline-none focus:border-sky-500 transition"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-end gap-3">
              <button
                type="submit"
                disabled={
                  !slotTime.trim() ||
                  (!selectedDate && !editingSlot)
                }
                className="bg-sky-500 hover:bg-sky-600 disabled:bg-slate-700 disabled:text-slate-500 text-white px-6 py-3 rounded-xl font-medium transition"
              >
                {editingSlot
                  ? "Update Slot"
                  : "Create Slot"}
              </button>

              <button
                type="button"
                onClick={closeForm}
                className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-medium transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* =========================
          Slots Container
      ========================= */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {/* Title */}
        <div className="px-6 py-5 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Time Slots
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {selectedDate
                  ? `Slots for ${selectedDate}`
                  : "Select a date to view slots"}
              </p>
            </div>

            {selectedDate && (
              <div className="bg-sky-500/10 text-sky-400 px-3 py-1.5 rounded-lg text-sm">
                {slots.length} Slot
                {slots.length !== 1 ? "s" : ""}
              </div>
            )}
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="p-12 text-center">
            <FaClock className="mx-auto text-4xl text-slate-700 mb-4" />

            <p className="text-slate-400">
              Loading time slots...
            </p>
          </div>
        ) : !selectedDate ? (
          /* No Date */
          <div className="p-12 text-center">
            <FaCalendarAlt className="mx-auto text-5xl text-slate-700 mb-4" />

            <h3 className="text-lg font-semibold text-white">
              Select a date
            </h3>

            <p className="text-slate-500 mt-2">
              Select a date above to view its time slots.
            </p>
          </div>
        ) : slots.length === 0 ? (
          /* No Slots */
          <div className="p-12 text-center">
            <FaClock className="mx-auto text-5xl text-slate-700 mb-4" />

            <h3 className="text-lg font-semibold text-white">
              No time slots
            </h3>

            <p className="text-slate-500 mt-2 mb-5">
              No slots have been created for this date.
            </p>

            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-xl font-medium transition"
            >
              <FaPlus />
              Add First Slot
            </button>
          </div>
        ) : (
          /* Slots */
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {slots.map((slot) => (
              <div
                key={slot._id}
                className={`border rounded-xl p-5 transition ${
                  slot.isBooked
                    ? "border-red-500/20 bg-red-500/5"
                    : "border-green-500/20 bg-green-500/5"
                }`}
              >
                {/* Slot Information */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                        slot.isBooked
                          ? "bg-red-500/10 text-red-400"
                          : "bg-green-500/10 text-green-400"
                      }`}
                    >
                      <FaClock />
                    </div>

                    <div>
                      <p className="font-semibold text-white">
                        {slot.slot}
                      </p>

                      <p
                        className={`text-xs mt-1 ${
                          slot.isBooked
                            ? "text-red-400"
                            : "text-green-400"
                        }`}
                      >
                        {slot.isBooked
                          ? "Booked"
                          : "Available"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(slot)}
                    disabled={slot.isBooked}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium transition"
                  >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(slot._id)
                    }
                    disabled={slot.isBooked}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium transition"
                  >
                    <FaTrash />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTimeSlots;