import React, { useState } from "react";
import axios from "axios";
import { Apidata } from "../Data/Api";

const AddProduct = ({LoginHandler}) => {
  if (localStorage.getItem("firmId") === null) {
    alert("Please login first");
    LoginHandler();
    return;
  }
  const [user, setUser] = useState({
    productName: "",
    price: "",
    category: [],  
    bestSeller: false,
    description: "",
    image: null,
  });

  const productHandler = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox" && name === "category") {
      const updated = checked
        ? [...user.category, value]
        : user.category.filter((item) => item !== value);
      setUser({ ...user, category: updated });
    } else if (type === "checkbox" && name === "bestSeller") {
      setUser({ ...user, bestSeller: checked });
    } else if (type === "file") {
      setUser({ ...user, image: files[0] });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const productSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", user.productName);
    formData.append("price", user.price);
    formData.append("description", user.description);
    formData.append("bestSeller", user.bestSeller);
    formData.append("image", user.image);

    
    user.category.forEach((item) => formData.append("category[]", item));

    try {
      
      
      const res = await axios.post(
        `${Apidata}/product/add-product/${localStorage.getItem("firmId")}`,
        formData
      );
      // console.log("Response:", res.data);
      if(res.data){
        alert("your products are added successfully");
      }
      setUser({
        productName: "",
        price: "",
        category: [],
        bestSeller: false,
        description: "",
        image: null,
      });
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
    }

    // console.log("Submitted", user);
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={productSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Add Product</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            value={user.productName}
            onChange={productHandler}
            className="w-full mt-1 px-4 py-2 border rounded-md"
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={user.price}
            onChange={productHandler}
            className="w-full mt-1 px-4 py-2 border rounded-md"
            placeholder="Enter price"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <div className="flex space-x-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="category"
                value="veg"  
                onChange={productHandler}
                className="accent-green-600 w-5 h-5"
              />
              <span className="text-gray-700 font-medium">Veg</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="category"
                value="non-veg"  
                onChange={productHandler}
                className="accent-red-600 w-5 h-5"
              />
              <span className="text-gray-700 font-medium">Non-Veg</span>
            </label>
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="bestSeller"
            checked={user.bestSeller}
            onChange={productHandler}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">
            Best Seller
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            rows="4"
            name="description"
            value={user.description}
            onChange={productHandler}
            className="w-full mt-1 px-4 py-2 border rounded-md"
            placeholder="Enter description"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={productHandler}
            className="mt-1 text-sm"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
