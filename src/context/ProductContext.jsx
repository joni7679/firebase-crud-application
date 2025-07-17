import React, { createContext, useEffect, useState } from 'react';
import { collection, addDoc, Timestamp, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { fireDb } from '../firebase/firebase';
import { toast, ToastContainer } from 'react-toastify';


export const ProductContext = createContext();
function ProductProvider({ children }) {


    const [allProducts, setAllProducts] = useState([]);

    const [products, setProducts] = useState({
        title: "",
        price: "",
        imageUrl: "",
        category: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        })
    });

    // read prducts
    const fetchProducts = async () => {
        try {
            const productsRef = collection(fireDb, "products");
            const querySnapshot = await getDocs(productsRef);
            const data = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setAllProducts(data);
        } catch (error) {
            console.error("Error fetching products: ", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [])

    // Add product
    const addProduct = async () => {
        const { title, price, imageUrl, category, time, date } = products;

        if (!title || !price || !imageUrl || !category) {
            toast.error("All fields are required");
            return;
        }
        if (title.length < 3) {
            toast.error("Title must be at least 3 characters");
            return;
        }
        if (!isNaN(title)) {
            toast.error("Title cannot be a number");
            return;
        }
        if (price.length < 1) {
            toast.error("Price must be at least 1 character");
            return;
        }


        try {
            let res = await addDoc(collection(fireDb, "products"), products);
            console.log(res);
            setProducts({
                title: "",
                price: "",
                imageUrl: "",
                category: "",
                time: Timestamp.now(),
                date: new Date().toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                })
            })
            toast.success("Product added successfully");
            fetchProducts();

        } catch (error) {
            console.error("Error adding product:", error);
            toast.error("Failed to add product");
        }
    };

    // Delete product 
    const deleteProduct = async (productid) => {
        try {
            const productRef = doc(fireDb, "products", productid);
            await deleteDoc(productRef);
            toast.success(" Product deleted successfully");
            fetchProducts();
        } catch (error) {
            console.error(" Error deleting product:", error);
            toast.error("Failed to delete product");
        }
    };


    // edit handle funcaion
    const handleEdit = (item) => {
        setProducts(item)
    }

    // Edit product 
    const editProduct = async (id, updatedData) => {
        const productRef = doc(fireDb, "products", id);
        try {
            let res = await updateDoc(productRef, updatedData);
            console.log("res", res);
            toast.success("Product updated successfully");
            fetchProducts();
        } catch (error) {
            console.error(" Error updated product:", error);
            toast.error("Failed to updated product");
        }
    };

    return (
        <ProductContext.Provider value={{ products, fetchProducts, allProducts, addProduct, deleteProduct, editProduct, allProducts, setProducts }}>
            <ToastContainer />
            {children}
        </ProductContext.Provider>
    );
}

export default ProductProvider;
