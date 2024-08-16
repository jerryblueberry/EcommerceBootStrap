import React, { useEffect, useState } from 'react';
import './StoreSection.css'; 
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../components/header/Header';

const StoreSection = () => {
    const { storeId } = useParams();
    const navigation = useNavigate();

    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/store/seller/products/${storeId}`, {
                    withCredentials: true
                });
                setProducts(response.data.products);
            } catch (error) {
                console.log("Error While fetching products", error);
            }
        };
        fetchProducts();

        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/order/${storeId}`, {
                    withCredentials: true,
                });
                setOrders(response.data.storeOrders);
            } catch (error) {
                console.log("Error While fetching Order for Stores", error);
            }
        };
        fetchOrders();
    }, [storeId]);

    const handleDelete = async (sku) => {
        try {
            const response = await axios.delete(`http://localhost:5000/product/delete/${sku}`, {
                withCredentials: true,
            });
            alert("Response", response.data);
        } catch (error) {
            console.log("Error while deleting product", error);
        }
    };

    const handleNavigation = (sku) => {
        navigation(`/detail/${sku}`);
    };

    const handleAddProduct = () => {
        navigation(`/seller/add-product/${storeId}`);
    };

    const handleAddBiddingProduct = () => {
        navigation(`/seller/add-biddingProduct/${storeId}`);
    };

    const handleUpdate = (sku) => {
        navigation(`/seller/update-product/${sku}`);
    };

    return (
      <>
        <Header/>
        <div className="store-section">
            <div className="dashboard-header">
                <h1>Seller Dashboard</h1>
                <button onClick={handleAddProduct} className="add-product-btn">Add New Product</button>
                <button onClick={handleAddBiddingProduct} className="add-product-btn">Add Bidding Product</button>
            </div>

            <div className="dashboard-content">
                <div className="orders-section">
                    <h2>Orders</h2>
                    {orders.map((order) => (
                        <div className="order-item" key={order._id}>
                            <h3>Order by: {order.userId.name}</h3>
                            <p>Timestamp: {new Date(order.timestamp).toLocaleString()}</p>
                            <div className="order-products">
                                {order.products.map((orderProduct) => (
                                    <div className="order-product" key={orderProduct._id}>
                                        <img src={`http://localhost:5000/${orderProduct.product.images[0]}`} alt="Product" />
                                        <p>{orderProduct.product.name}</p>
                                        <p>Quantity: {orderProduct.quantity}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="products-section">
                    <h2>Products</h2>
                    {products.map((product) => (
                        <div className='product-section' key={product.sku}>
                            <div className="product-item">
                                <img onClick={() => handleNavigation(product.sku)} src={`http://localhost:5000/${product.images[0]}`} alt="Product" />
                                <span>{product.name}</span>
                                <div className='update_options'>
                                    <div onClick={() => handleUpdate(product.sku)}>
                                        <i className="ri-edit-line"></i>
                                    </div>
                                    <div className='delete_Section' onClick={() => handleDelete(product.sku)}>
                                        <i className="ri-delete-bin-line"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </>
       
    );
};

export default StoreSection;
