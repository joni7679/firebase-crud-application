import { createBrowserRouter } from "react-router-dom";
import AddProduct from '../components/AddProduct';
import EditProduct from '../components/EditProduct'
import App from '../App'

export let router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "addProducts",
        element: <AddProduct />
    },
    {
        path: "editProducts/:id",
        element: <EditProduct />
    },

])