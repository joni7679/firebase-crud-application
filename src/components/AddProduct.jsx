import React, { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";

const AddProduct = () => {
    let navigate = useNavigate()


    // add prducts logic here
    let { addProduct, products, setProducts } = useContext(ProductContext);



    const handleSubmit = async (e) => {
        e.preventDefault();
        let success = await addProduct()
        if (success) {
            setTimeout(() => {
                navigate("/");
            }, 1000);
        }
    }

    



    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg text-white">
                <div className="flex items-start justify-center gap-2.5">
                    <Link to={`/`}>
                        <FaArrowCircleLeft className="text-xl cursor-pointer" />
                    </Link>


                    <h2 className="text-2xl font-semibold mb-4 text-center ">


                        Add New Product
                    </h2>

                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={products.title}
                        onChange={(e) => setProducts({ ...products, title: e.target.value })}

                        placeholder="Product Name"
                        className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="number"
                        value={products.price}
                        onChange={(e) => setProducts({ ...products, price: e.target.value })}
                        placeholder="Price"
                        className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        value={products.category}
                        onChange={(e) => setProducts({ ...products, category: e.target.value })}
                        placeholder="Category"
                        className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                   
                    <input
                        type="url"
                        value={products.imageUrl}
                        onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })}
                        name="imageUrl"
                        placeholder="Image URL"
                        className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 py-2 rounded-md font-semibold transition"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
