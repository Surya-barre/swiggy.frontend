import axios from "axios";
import React, { useState, useEffect } from "react";
import { Apidata } from "../Data/Api";

const AllProduct = ({LoginHandler}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    const firmId = localStorage.getItem("firmId");
    // console.log("Firm ID:", firmId);

    if (firmId) {
      axios
        .get(`${Apidata}/product/${firmId}/products`)
        .then((res) => {
          console.log("API Response:", res.data);
          setProducts(res.data.products || res.data);
        })
        .catch((err) => console.log("Error fetching products:", err));
    }
    else{
      alert("Please login first");
      LoginHandler();
    }
  };

  const handleDelete = async (productId) => {
    try {
     const res= await axios.delete(`${Apidata}/product/${productId}`);
     
      if (res.data.message === "Product deleted successfully") {
        alert(res.data.message);
      }
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>your products are </h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "200px",
              borderRadius: "8px",
              position: "relative",
            }}
          >
            <img
              src={`http://localhost:4000/uploads/${product.image}`}
              alt={product.productName}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <h3>{product.productName}</h3>
            <p>Price: ₹{product.price}</p>
            <button
              onClick={() => handleDelete(product._id)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
                marginTop: "10px",
                borderRadius: "4px",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
