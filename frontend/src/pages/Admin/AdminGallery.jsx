import { useEffect, useState } from "react";
import {
  FaEdit,
  FaEye,
  FaEyeSlash,
  FaImage,
  FaImages,
  FaPlus,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import api from "../../api/api";
import { useToast } from "../../componenets/Toast/ToastCongtext";
const AdminGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isActive: true,
  });
  const { showToast } = useToast();
  const fetchGallery = async () => {
    try {
      setLoading(true);

      const response = await api.get("/gallery");
      console.log("GALLERY RESPONSE:", response.data);

      setGallery(response.data.data || []);
    } catch (error) {
      console.error("Gallery fetch error:", error);

      showToast(
        error.response?.data?.message ||
          "Failed to load gallery",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast("Image must be less than 5MB", "error");
      return;
    }

    setImageFile(file);

    setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      isActive: true,
    });

    setImageFile(null);
    setPreview("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      showToast("Title is required", "error");
      return;
    }

    if (!editingId && !imageFile) {
      showToast("Please select an image", "error");
      return;
    }

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append(
        "description",
        formData.description
      );
      data.append(
        "isActive",
        formData.isActive
      );

      if (imageFile) {
        data.append("image", imageFile);
      }

      if (editingId) {
        await api.put(
          `/gallery/${editingId}`,
          data
        );

        showToast(
          "Gallery image updated successfully",
          "success"
        );
      } else {
        await api.post("/gallery", data);

        showToast(
          "Gallery image added successfully",
          "success"
        );
      }

      resetForm();

      await fetchGallery();
    } catch (error) {
      console.error(
        "Gallery save error:",
        error
      );

      showToast(
        error.response?.data?.message ||
          "Something went wrong",
        "error"
      );
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);

    setFormData({
      title: item.title || "",
      description: item.description || "",
      isActive: item.isActive,
    });

    setImageFile(null);
    setPreview(item.image || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/gallery/${id}`);

      await fetchGallery();

      showToast(
        "Gallery image deleted successfully",
        "success"
      );
    } catch (error) {
      console.error(
        "Delete error:",
        error
      );

      showToast(
        error.response?.data?.message ||
          "Failed to delete image",
        "error"
      );
    }
  };

  return (
    <div className="animate-[fadeIn_0.5s_ease-out]">

      {/* HEADER */}

      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center text-xl">
            <FaImages />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              Gallery Management
            </h1>

            <p className="text-slate-400 mt-1">
              Manage your car washing center gallery.
            </p>
          </div>

        </div>

        <button
          onClick={() => {
            resetForm();

            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 px-5 py-3 rounded-xl font-medium transition hover:-translate-y-1"
        >
          <FaPlus />
          Add Image
        </button>

      </div>


      {/* FORM */}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-10">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
            {editingId ? <FaEdit /> : <FaPlus />}
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              {editingId
                ? "Edit Gallery Image"
                : "Add Gallery Image"}
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Upload images for your website gallery.
            </p>
          </div>

        </div>


        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* TITLE */}

            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Image Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Premium Car Wash"
                className="w-full bg-slate-800 border border-slate-700 focus:border-sky-500 outline-none rounded-xl px-4 py-3 text-white placeholder:text-slate-600 transition"
              />
            </div>


            {/* IMAGE */}

            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Upload Image
              </label>

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-sky-500 file:px-4 file:py-2 file:text-white file:cursor-pointer"
              />

              <p className="text-xs text-slate-500 mt-2">
                JPG, PNG or WEBP • Maximum 5MB
              </p>

              {imageFile && (
                <p className="text-xs text-sky-400 mt-2">
                  Selected: {imageFile.name}
                </p>
              )}
            </div>


            {/* DESCRIPTION */}

            <div className="lg:col-span-2">

              <label className="block text-sm text-slate-400 mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Describe this image..."
                className="w-full bg-slate-800 border border-slate-700 focus:border-sky-500 outline-none rounded-xl px-4 py-3 text-white placeholder:text-slate-600 transition resize-none"
              />

            </div>


            {/* ACTIVE */}

            <div className="lg:col-span-2">

              <label className="flex items-center gap-3 cursor-pointer">

                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-5 h-5 accent-sky-500"
                />

                <div>
                  <p className="text-sm font-medium">
                    Show on website
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Active images will appear on the public website.
                  </p>
                </div>

              </label>

            </div>

          </div>


          {/* PREVIEW */}

          {preview && (
            <div className="mt-6">

              <p className="text-sm text-slate-400 mb-3">
                Image Preview
              </p>

              <div className="w-full md:w-80 h-48 rounded-xl overflow-hidden border border-slate-800">

                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />

              </div>

            </div>
          )}


          {/* BUTTONS */}

          <div className="flex gap-3 mt-7">

            <button
              type="submit"
              className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 px-5 py-3 rounded-xl font-medium transition hover:-translate-y-1"
            >
              {editingId ? <FaEdit /> : <FaPlus />}

              {editingId
                ? "Update Image"
                : "Add Image"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-5 py-3 rounded-xl font-medium transition"
              >
                <FaTimes />
                Cancel
              </button>
            )}

          </div>

        </form>
      </div>


      {/* GALLERY HEADER */}

      <div className="flex items-center justify-between mb-5">

        <div>
          <h2 className="text-xl font-semibold">
            Gallery Images
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            {gallery.length} image
            {gallery.length !== 1 ? "s" : ""}
          </p>
        </div>

        <button
          onClick={fetchGallery}
          disabled={loading}
          className="text-sky-400 hover:text-sky-300 text-sm transition"
        >
          {loading
            ? "Refreshing..."
            : "Refresh"}
        </button>

      </div>


      {/* GALLERY GRID */}

      {loading ? (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">

          <div className="w-10 h-10 border-4 border-slate-700 border-t-sky-500 rounded-full animate-spin mx-auto mb-4" />

          <p className="text-slate-500">
            Loading gallery...
          </p>

        </div>

      ) : gallery.length === 0 ? (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">

          <div className="w-16 h-16 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center text-2xl mx-auto mb-4">
            <FaImage />
          </div>

          <h3 className="text-lg font-semibold">
            No Gallery Images
          </h3>

          <p className="text-slate-500 text-sm mt-2">
            Add your first image above.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {gallery.map((item, index) => (

            <div
              key={item._id}
              style={{
                animationDelay: `${index * 80}ms`,
              }}
              className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-sky-500/40 transition-all duration-500 hover:-translate-y-2 animate-[cardIn_0.5s_ease-out_both]"
            >

              <div className="relative h-56 overflow-hidden bg-slate-800">

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute top-4 right-4">

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border backdrop-blur-md ${
                      item.isActive
                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                        : "bg-slate-900/80 text-slate-400 border-slate-700"
                    }`}
                  >
                    {item.isActive ? (
                      <>
                        <FaEye />
                        Active
                      </>
                    ) : (
                      <>
                        <FaEyeSlash />
                        Inactive
                      </>
                    )}
                  </span>

                </div>

              </div>


              <div className="p-5">

                <h3 className="text-lg font-semibold truncate">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-500 mt-2 line-clamp-2 min-h-10">
                  {item.description ||
                    "No description available."}
                </p>


                <div className="flex gap-3 mt-5">

                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-sky-500/10 hover:text-sky-400 border border-slate-700 hover:border-sky-500/30 px-4 py-2.5 rounded-xl text-sm transition"
                  >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(item._id)
                    }
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-red-500/10 hover:text-red-400 border border-slate-700 hover:border-red-500/30 px-4 py-2.5 rounded-xl text-sm transition"
                  >
                    <FaTrash />
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}


      {/* ANIMATION */}

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes cardIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

    </div>
  );
};

export default AdminGallery;