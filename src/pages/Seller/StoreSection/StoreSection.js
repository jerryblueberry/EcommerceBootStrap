import React, { useEffect, useState } from 'react';
import './StoreSection.css'; 
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';

const StoreSection = () => {
    const {storeId} = useParams();
    const navigation = useNavigate();

    const [products,setProducts] = useState([]);

    useEffect(() => {
      const fetchProducts = async() => {
        try {

          const response = await axios.get(`http://localhost:5000/store/seller/products/${storeId}`,{
            withCredentials:true
          })
          setProducts(response.data.products)
        } catch (error) {
          console.log("Error While fetching products",error);
        }
      }
      fetchProducts();
    },[]);
    console.log(products)

    const handleNavigation = (sku) => {
      navigation(`/detail/${sku}`)
    }


    const handleAddProduct  = () => {
        navigation(`/seller/add-product/${storeId}`)
        
    }

    const handleUpdate  = (sku) => {
      navigation(`/seller/update-product/${sku}`);
    }
  return (
    <div className="store-section">
      <div className="dashboard-header">
        <h1>Seller Dashboard</h1>
        <button onClick={handleAddProduct} className="add-product-btn">Add New Product</button>
      </div>
      
      <div className="dashboard-content">
        <div className="orders-section">
          <h2>Orders</h2>
          {/* Map over orders and display them */}
          <div className="order-item">Order #1234</div>
          <div className="order-item">Order #1235</div>
          {/* Add more orders here */}
        </div>

        <div className="products-section">
          <h2>Products</h2>
          {/* Map over products and display them */}
          {products.map((product => (
            <div className='product-section'>
            <div className="product-item" >
            <img onClick={() => handleNavigation(product.sku)} src={`http://localhost:5000/${product.images[0]}`} alt="Product" />
            
            <span>{product.name}</span>
            <div className='update_options'>
            <div onClick={() => handleUpdate(product.sku)}>
            <i  class="ri-edit-line"></i>

            </div>
            
            <i class="ri-delete-bin-line"></i>
            </div>
          </div>

            </div>
          )))}
     
     
        </div>
      </div>
    </div>
  );
}

export default StoreSection;
