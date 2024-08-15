import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './GetCart.css';

const GetCart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cart/cart-detail', {
          withCredentials: true
        });
        setCart(response.data.userCart);
      } catch (error) {
        toast.error('Error fetching cart details', { position: "top-right" });
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleRemoveProduct = async (productId) => {
    try {
      await axios.delete('http://localhost:5000/cart/remove', {
        data: { product: productId },
        withCredentials: true
      });
      toast.success('Product removed from cart', { position: "top-right" });
      // Refresh the cart data
      const response = await axios.get('http://localhost:5000/cart/cart-detail', {
        withCredentials: true
      });
      setCart(response.data.userCart);
    } catch (error) {
      toast.error('Error removing product from cart', { position: 'top-right' });
    }
  };

  const handlePurchase = async () => {
    try {
      await axios.post(
        'http://localhost:5000/order', 
        {},  // Include any required data in the request body if needed
        {
          withCredentials: true 
        }
      );
        window.location.reload();
      // Show success toast
      toast.success('Purchase successful!', { 
        position: 'top-right',
        onClose: () => {
          // Refresh the page after the toast is closed
          window.location.reload();
        }
      });
    } catch (error) {
      // Show error toast
      toast.error('Error processing purchase!', { position: 'top-right' });
      console.log('Error while posting order', error);
    }
  };
  
  

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (!cart) {
    return <div className="error">Cart not found</div>;
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      <div className="cart-items">
        {cart.products.map((item) => (
          <div key={item._id} className="cart-item">
            <div className="cart-item-image">
              <img src={`http://localhost:5000/${item.product.images[0]}`} alt={item.product.name} />
            </div>
            <div className="cart-item-details">
              <h2 className="cart-item-name">{item.product.name}</h2>
              <p className="cart-item-description">{item.product.description}</p>
              <p className="cart-item-price">Price: ${item.product.price - (item.product.price * item.product.discount / 100)}</p>
              <p className="cart-item-quantity">Quantity: {item.quantity}</p>
            </div>
            <div className="cart-item-remove">
              <button onClick={() => handleRemoveProduct(item.product._id)} className="remove-button">
                &#x2715;
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2 className="summary-title">Cart Summary</h2>
        <p className="total-price">Total Price: ${cart.total_price}</p>
        <button className="purchase-button" onClick={handlePurchase}>
          Purchase
        </button>
      </div>
    </div>
  );
};

export default GetCart;
