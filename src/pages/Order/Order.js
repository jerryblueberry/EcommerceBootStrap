import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Order.css';
import Header from '../../components/header/Header';

const Order = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/order/all', { withCredentials: true });
                setOrders(response.data.orders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <Header />
            <div className="order-container">
                {orders.length > 0 ? (
                    orders
                        .filter(order => order.products && order.products.length > 0) // Exclude orders with biddingProducts
                        .map(order => (
                            <div className="order-card" key={order._id}>
                                <h2 className="order-id">Order ID: {order._id}</h2>
                                <p className="order-timestamp">TimeStamp: {new Date(order.timestamp).toLocaleString()}</p>
                                <div className="order-details">
                                    <div className="product-section">
                                       
                                        {order.products.map(productItem => (
                                            <div className="product-card" key={productItem._id}>
                                                <img src={`http://localhost:5000/${productItem.product.images[0]}`} alt={productItem.product.name} />
                                                <p className="product-name">{productItem.product.name}</p>
                                                <p className="product-quantity">Quantity: {productItem.quantity}</p>
                                                <p className="product-price">Price: ${productItem.product.price}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="order-total">
                                    <p>Total Price: ${order.total_price}</p>
                                </div>
                            </div>
                        ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default Order;
