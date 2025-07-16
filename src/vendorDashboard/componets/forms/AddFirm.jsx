import React, { useState, useRef } from "react";
import axios from "axios";
import { Apidata } from "../Data/Api";

const AddFirm = ({ LoginHandler }) => {
  const fileInputRef = useRef(); // ✅ for resetting file input
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login first");
    LoginHandler();

    return;
  }

  const [firm, setFirm] = useState({
    firmName: "",
    area: "",
    category: [],
    region: [],
    offer: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFirm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e, key) => {
    const value = e.target.value.toLowerCase();
    const { checked } = e.target;

    setFirm((prev) => {
      const updatedArray = checked
        ? [...prev[key], value]
        : prev[key].filter((item) => item !== value);
      return { ...prev, [key]: updatedArray };
    });
  };

  const handleImage = (e) => {
    setFirm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const resetForm = () => {
    setFirm({
      firmName: "",
      area: "",
      category: [],
      region: [],
      offer: "",
      image: null,
    });

    // ✅ Reset the file input manually
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firmName", firm.firmName);
    formData.append("area", firm.area);
    formData.append("offer", firm.offer);
    if (firm.image) formData.append("image", firm.image);
    firm.category.forEach((item) => formData.append("category", item));
    firm.region.forEach((item) => formData.append("region", item));

    try {
     

      const res = await axios.post(`${Apidata}/firm/addfirm`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log(res.data.message);
      localStorage.setItem("firmId", res.data.firmId);
      alert("for your confirmation of the firmName once again login");
      resetForm();
      LoginHandler();
    } catch (err) {
      if (
        err.response &&
        err.response.data.message === "vendor can have only one firm"
      ) {
        alert("Sorry, you can add only one firm. You already added it.");
        resetForm();
      } else {
        alert("Failed to add firm. Please try again.");
        console.error(err.response?.data || err.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h3 className="text-2xl font-semibold text-center mb-6">Add Firm</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firmName"
            value={firm.firmName}
            onChange={handleChange}
            placeholder="Firm Name"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="text"
            name="area"
            value={firm.area}
            onChange={handleChange}
            placeholder="Area"
            className="w-full px-4 py-2 border rounded-md"
            required
          />

          {/* Category */}
          <div>
            <label>Category</label>
            <div className="flex gap-4">
              {["veg", "non-veg"].map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={item}
                    checked={firm.category.includes(item)}
                    onChange={(e) => handleCheckbox(e, "category")}
                  />
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {/* Region */}
          <div>
            <label>Region</label>
            <div className="grid grid-cols-2 gap-2">
              {["south-india", "north-indian", "chinese", "bakery"].map(
                (item) => (
                  <label key={item} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={item}
                      checked={firm.region.includes(item)}
                      onChange={(e) => handleCheckbox(e, "region")}
                    />
                    {item
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </label>
                )
              )}
            </div>
          </div>
                                                                             
          <input
            type="text"
            name="offer"
            value={firm.offer}
            onChange={handleChange}
            placeholder="Offer"
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            ref={fileInputRef} // ✅ reference to reset input
            className="w-full px-4 py-2 border rounded-md"
            
          />

          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFirm;
