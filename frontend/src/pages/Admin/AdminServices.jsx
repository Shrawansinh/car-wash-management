import { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaEdit,
  FaPlus,
  FaTimesCircle,
  FaTools,
  FaTrash,
} from "react-icons/fa";
import api from "../../api/api";
import { useToast } from "../../componenets/Toast/ToastCongtext";
const emptyForm = {
  name: "",
  description: "",
  prices: {
    bike: "",
    car: "",
    truck: "",
    eightTyreTruck: "",
    heavyVehicle: "",
  },
  duration: "",
  features: "",
  image: "",
  isActive: true,
};

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();
  // --------------------------------
  // Fetch Services
  // --------------------------------

  const fetchServices = async () => {
    try {
      setLoading(true);

      const response = await api.get("/services");

      setServices(response.data.data || []);
    } catch (error) {
      console.error("Fetch services error:", error);

      showToast(
        error.response?.data?.message ||
          "Failed to load services",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // --------------------------------
  // Handle normal input
  // --------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --------------------------------
  // Handle price input
  // --------------------------------

  const handlePriceChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      prices: {
        ...prev.prices,
        [name]: value,
      },
    }));
  };

  // --------------------------------
  // Open Add Form
  // --------------------------------

  const handleAdd = () => {
    setEditingService(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  // --------------------------------
  // Open Edit Form
  // --------------------------------

  const handleEdit = (service) => {
    setEditingService(service);

    setFormData({
      name: service.name || "",
      description: service.description || "",

      prices: {
        bike: service.prices?.bike ?? "",
        car: service.prices?.car ?? "",
        truck: service.prices?.truck ?? "",
        eightTyreTruck:
          service.prices?.eightTyreTruck ?? "",
        heavyVehicle:
          service.prices?.heavyVehicle ?? "",
      },

      duration: service.duration ?? "",

      features: Array.isArray(service.features)
        ? service.features.join(", ")
        : "",

      image: service.image || "",

      isActive: service.isActive ?? true,
    });

    setShowForm(true);
  };

  // --------------------------------
  // Close Form
  // --------------------------------

  const closeForm = () => {
    setShowForm(false);
    setEditingService(null);
    setFormData(emptyForm);
  };

  // --------------------------------
  // Create / Update Service
  // --------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        name: formData.name.trim(),

        description: formData.description.trim(),

        prices: {
          bike: Number(formData.prices.bike),
          car: Number(formData.prices.car),
          truck: Number(formData.prices.truck),
          eightTyreTruck: Number(
            formData.prices.eightTyreTruck
          ),

          heavyVehicle:
            formData.prices.heavyVehicle === ""
              ? null
              : Number(formData.prices.heavyVehicle),
        },

        duration: Number(formData.duration),

        features: formData.features
          .split(",")
          .map((feature) => feature.trim())
          .filter(Boolean),

        image: formData.image.trim(),

        isActive: formData.isActive,
      };

      if (editingService) {
        await api.put(
          `/services/${editingService._id}`,
          payload
        );

        showToast("Service updated successfully", "success");
      } else {
        await api.post("/services", payload);

        showToast("Service created successfully", "success");
      }

      closeForm();
      fetchServices();
    } catch (error) {
      console.error("Save service error:", error);

      showToast(
        error.response?.data?.message ||
          "Failed to save service",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------
  // Delete Service
  // --------------------------------

  const handleDelete = async (serviceId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/services/${serviceId}`);

      showToast("Service deleted successfully", "success");

      fetchServices();
    } catch (error) {
      console.error("Delete service error:", error);

      showToast(
        error.response?.data?.message ||
          "Failed to delete service",
        "error"
      );
    }
  };

  return (
    <div>
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Services{" "}
            <span className="text-sky-400">
              Management
            </span>
          </h1>

          <p className="text-slate-400 mt-2">
            Create and manage your car wash services.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-xl font-medium transition"
        >
          <FaPlus />
          Add Service
        </button>
      </div>

      {/* Add / Edit Form */}

      {showForm && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white">
                {editingService
                  ? "Edit Service"
                  : "Add Service"}
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {editingService
                  ? "Update service details and pricing."
                  : "Create a new car wash service."}
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

          <form onSubmit={handleSubmit}>
            {/* Basic Information */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}

              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Service Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Simple Wash"
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-sky-500"
                />
              </div>

              {/* Duration */}

              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Duration (minutes)
                </label>

                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="45"
                  min="5"
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Description */}

            <div className="mt-5">
              <label className="block text-sm text-slate-400 mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Complete exterior and interior basic wash service."
                rows="3"
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-sky-500 resize-none"
              />
            </div>

            {/* Pricing */}

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Vehicle Pricing
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Bike */}

                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Bike (₹)
                  </label>

                  <input
                    type="number"
                    name="bike"
                    value={formData.prices.bike}
                    onChange={handlePriceChange}
                    placeholder="50"
                    min="0"
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-sky-500"
                  />
                </div>

                {/* Car */}

                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Car (₹)
                  </label>

                  <input
                    type="number"
                    name="car"
                    value={formData.prices.car}
                    onChange={handlePriceChange}
                    placeholder="400"
                    min="0"
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-sky-500"
                  />
                </div>

                {/* Truck */}

                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Truck (₹)
                  </label>

                  <input
                    type="number"
                    name="truck"
                    value={formData.prices.truck}
                    onChange={handlePriceChange}
                    placeholder="800"
                    min="0"
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-sky-500"
                  />
                </div>

                {/* 8 Tyre Truck */}

                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    8-Tyre Truck (₹)
                  </label>

                  <input
                    type="number"
                    name="eightTyreTruck"
                    value={
                      formData.prices.eightTyreTruck
                    }
                    onChange={handlePriceChange}
                    placeholder="1400"
                    min="0"
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-sky-500"
                  />
                </div>

                {/* Heavy Vehicle */}

                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Heavy Vehicle (₹)
                  </label>

                  <input
                    type="number"
                    name="heavyVehicle"
                    value={
                      formData.prices.heavyVehicle
                    }
                    onChange={handlePriceChange}
                    placeholder="Contact"
                    min="0"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-sky-500"
                  />

                  <p className="text-xs text-slate-600 mt-1">
                    Leave empty for contact pricing
                  </p>
                </div>
              </div>
            </div>

            {/* Features */}

            <div className="mt-6">
              <label className="block text-sm text-slate-400 mb-2">
                Features
              </label>

              <input
                type="text"
                name="features"
                value={formData.features}
                onChange={handleChange}
                placeholder="Foam Wash, Tyre Cleaning, Interior Vacuum"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-sky-500"
              />

              <p className="text-xs text-slate-600 mt-1">
                Separate features with commas.
              </p>
            </div>

            {/* Image */}

            <div className="mt-5">
              <label className="block text-sm text-slate-400 mb-2">
                Image URL
              </label>

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-sky-500"
              />
            </div>

            {/* Active */}

            <div className="mt-5">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isActive: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 accent-sky-500"
                />

                <span className="text-sm text-slate-300">
                  Service is active
                </span>
              </label>
            </div>

            {/* Buttons */}

            <div className="flex flex-col sm:flex-row gap-3 mt-7">
              <button
                type="submit"
                disabled={saving}
                className="bg-sky-500 hover:bg-sky-600 disabled:bg-slate-700 disabled:text-slate-500 text-white px-6 py-3 rounded-xl font-medium transition"
              >
                {saving
                  ? "Saving..."
                  : editingService
                  ? "Update Service"
                  : "Create Service"}
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

      {/* Services */}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                All Services
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Manage your available car wash services.
              </p>
            </div>

            <div className="bg-sky-500/10 text-sky-400 px-3 py-1.5 rounded-lg text-sm">
              {services.length}{" "}
              {services.length === 1
                ? "Service"
                : "Services"}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <FaTools className="mx-auto text-4xl text-slate-700 mb-4" />

            <p className="text-slate-400">
              Loading services...
            </p>
          </div>
        ) : services.length === 0 ? (
          <div className="p-12 text-center">
            <FaTools className="mx-auto text-5xl text-slate-700 mb-4" />

            <h3 className="text-lg font-semibold text-white">
              No services found
            </h3>

            <p className="text-slate-500 mt-2 mb-5">
              Create your first car wash service.
            </p>

            <button
              type="button"
              onClick={handleAdd}
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-xl font-medium transition"
            >
              <FaPlus />
              Add Service
            </button>
          </div>
        ) : (
          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
            {services.map((service) => (
              <div
                key={service._id}
                className="border border-slate-800 rounded-2xl p-6 hover:border-sky-500/30 transition"
              >
                {/* Service Header */}

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {service.name}
                    </h3>

                    <p className="text-sm text-slate-400 mt-1">
                      {service.duration} minutes
                    </p>
                  </div>

                  <div>
                    {service.isActive ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 text-xs border border-green-500/20">
                        <FaCheckCircle />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs border border-red-500/20">
                        <FaTimesCircle />
                        Inactive
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}

                <p className="text-slate-400 text-sm mt-4">
                  {service.description}
                </p>

                {/* Pricing */}

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                  <div className="bg-slate-950 rounded-xl p-3">
                    <p className="text-xs text-slate-500">
                      Bike
                    </p>

                    <p className="font-semibold text-white mt-1">
                      ₹{service.prices?.bike ?? "-"}
                    </p>
                  </div>

                  <div className="bg-slate-950 rounded-xl p-3">
                    <p className="text-xs text-slate-500">
                      Car
                    </p>

                    <p className="font-semibold text-white mt-1">
                      ₹{service.prices?.car ?? "-"}
                    </p>
                  </div>

                  <div className="bg-slate-950 rounded-xl p-3">
                    <p className="text-xs text-slate-500">
                      Truck
                    </p>

                    <p className="font-semibold text-white mt-1">
                      ₹{service.prices?.truck ?? "-"}
                    </p>
                  </div>

                  <div className="bg-slate-950 rounded-xl p-3">
                    <p className="text-xs text-slate-500">
                      8-Tyre
                    </p>

                    <p className="font-semibold text-white mt-1">
                      ₹
                      {service.prices?.eightTyreTruck ??
                        "-"}
                    </p>
                  </div>
                </div>

                {/* Features */}

                {service.features?.length > 0 && (
                  <div className="mt-5">
                    <p className="text-sm text-slate-500 mb-2">
                      Features
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {service.features.map(
                        (feature, index) => (
                          <span
                            key={index}
                            className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg"
                          >
                            {feature}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}

                <div className="flex gap-3 mt-6 pt-5 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() =>
                      handleEdit(service)
                    }
                    className="flex-1 flex items-center justify-center gap-2 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 px-4 py-2.5 rounded-xl text-sm font-medium transition"
                  >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(service._id)
                    }
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2.5 rounded-xl text-sm font-medium transition"
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

export default AdminServices;