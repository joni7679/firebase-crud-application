import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Timestamp } from "firebase/firestore";

const EditProduct = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    imageUrl: "",
    date: "",
  });

  console.log(id);

  const { allProducts, editProduct, fetchProducts } = useContext(ProductContext);

  // filter data
  const updatedProduct = allProducts.find((product) => product.id === id);



  // handleInputChange
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }


  useEffect(() => {
    if (updatedProduct) {
      setFormData({
        title: updatedProduct.title || "",
        price: updatedProduct.price || "",
        category: updatedProduct.category || "",
        imageUrl: updatedProduct.imageUrl || "",
        date: updatedProduct.date || "",
      })

    }
  }, [allProducts, id])
  // update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.category || !formData.imageUrl) {
      toast.warn("Please fill all fields");
      return;
    }
    if (formData.title.length < 3) {
      toast.error("Title must be at least 3 characters");
      return;
    }
    if (!isNaN(formData.title)) {
      toast.error("Title cannot be a number");
      return;
    }
    if (formData.price.length < 1) {
      toast.error("Price must be at least 1 character");
      return;
    }
    try {
      await editProduct(id, {
        ...formData,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      console.error("updating perobem", error)
    }





    console.log("update product");
  }
  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg text-white">
          <h2 className="text-2xl font-semibold mb-4 text-center"> Edit Product</h2>

          <form className="space-y-4" onSubmit={handleUpdate}>
            <input
              type="text"
              value={formData.title}
              name="title"
              onChange={handleInputChange}

              placeholder="Product Name"
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={formData.category}
              name="category"
              onChange={handleInputChange}
              placeholder="Category"
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={formData.date}
              name="date"
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="url"

              value={formData.imageUrl}
              onChange={handleInputChange}
              name="imageUrl"
              placeholder="Image URL"
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full cursor-pointer bg-green-600 hover:bg-green-700 py-2 rounded-md font-semibold transition"
            >
              Update Products
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
