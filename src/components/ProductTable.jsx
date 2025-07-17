import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import ShimmerTable from "./ShimmerTable";

const ProductTable = () => {
    const { allProducts, deleteProduct } = useContext(ProductContext);
    let navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [sort, setSort] = useState("asc");

    //  delete product logic here
    let deleteData = (id) => {

        let confim = window.confirm("Are You Sure Went To delete This Data");
        if (confim) {
            deleteProduct(id)
        }
    }

    // handle updte
    let handleUpdate = (id) => {
        console.log(id);
        let confim = window.confirm("Are You Sure Went To Edit This Data");
        if (confim) {
            navigate(`/editProducts/${id}`)
        }
    }
    // search logic here
    let searchProducts = allProducts.filter((product) => {
        return product.title?.toLowerCase().includes(searchQuery.toLowerCase()) || product.category?.toLowerCase().includes(search(searchQuery.toLocaleLowerCase))

    })

    if (searchProducts.length === 0) {
        return <ShimmerTable />
    }
    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white font-sans">
            <div className="max-w-6xl mx-auto bg-gray-800 rounded-xl overflow-hidden shadow-lg">

                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
                    <h2 className="text-xl font-bold">Product Data</h2>
                    <Link to={`/addProducts`} className="bg-blue-600 cursor-pointer hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium transition">
                        Add Product
                    </Link>
                </div>


                <div className="px-6 py-4">
                    <input
                        type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search here..."
                        className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                <div className="overflow-x-auto px-6 pb-6">
                    <table className="w-full text-sm text-left">
                        <thead className="text-gray-400 border-b border-gray-700">
                            <tr>
                                <th className="py-2">S.No</th>
                                <th>Product Image</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th colSpan="2" className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-white ">

                            {
                                searchProducts.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center py-4">No Data Found</td>
                                    </tr>
                                ) :
                                    (

                                        searchProducts.map((item, idx) => (
                                            <tr key={idx} className="border-b  rounded px-5 mt-[50px]  py-[30px] border-gray-700 hover:bg-gray-700 transition">
                                                <td className="px-3 rounded">{idx + 1}</td>
                                                <td>
                                                    <img
                                                        src={item.imageUrl}
                                                        alt="product"
                                                        className="w-20 h-20 rounded-md object-cover"
                                                    />
                                                </td>
                                                <td>{item.title}</td>
                                                <td>₹ {item.price}</td>
                                                <td>{item.category}</td>
                                                <td>{item.date}3</td>
                                                <td className="text-center">
                                                    <button onClick={() => deleteData(item.id)} className="bg-red-600 cursor-pointer hover:bg-red-700 px-3 py-1 rounded-md text-white">
                                                        delete
                                                    </button>
                                                </td>
                                                <td className="text-center">
                                                    <button onClick={() => handleUpdate(item.id)} className="bg-green-600 cursor-pointer hover:bg-green-700 px-3 py-1 rounded-md text-white">
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>)
                                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductTable;
