import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Vendor.css'; // Import the CSS for styling
import { useParams,useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';

const VendorDetail = () => {
    const navigate = useNavigate();
    const [store, setStore] = useState(null);
    const [products,setProducts] = useState([]);
    const { storeId } = useParams();

    useEffect(() => {
        const fetchStore = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/store/get-store/${storeId}`, {
                    withCredentials: true
                });
                setStore(response.data.store);
            } catch (error) {
                console.log("Error fetching store details", error);
            }
        };
    
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/store/seller/products/${storeId}`, {
                    withCredentials: true
                });
                setProducts(response.data.products);
            } catch (error) {
                console.log("Error fetching store products", error);
            }
        };
        fetchStore();
        fetchProducts();
        
    }, [storeId]);
    const calculateDiscountPrice = (price, discount) => {
        return price - (price * (discount / 100));
    };
    console.log(products);
    if (!store) {
        return <p>Loading...</p>;
    }
    const handleNavigateDetail = (sku) => {
        navigate(`/detail/${sku}`)
    }
    return (
        <>
            <Header/>
            <div className="store-detail">
            <div className="store-header">
                <img src={`http://localhost:5000/${store.logo}`} alt="Store Logo" className="store-logo" />
                <div className="store-info">
                    <h1 className="store-name">{store.name}</h1>
                    <p className="store-category">{store.category}</p>
                    {/* <p className={`store-status ${store.isVerified ? 'verified' : 'pending'}`}>
                        {store.isVerified ? 'Verified' : 'Pending'}
                    </p> */}
                </div>
            </div>
            <div className="store-details">
                <div className="store-owner">
                    <img src={`http://localhost:5000/${store.userId.profilePicture}`} alt="Owner Profile" className="owner-profile" />
                    <div>
                        <h2>{store.userId.name}</h2>
                        {/* <p>Email: {store.userId.email}</p> */}
                    </div>
                </div>
                <div className="store-info-details">
                    <p><strong>Contact No:</strong> {store.contactNo}</p>
                    <p><strong>Address:</strong> {store.address}</p>
                    <p><strong>Description:</strong> {store.description}</p>
                </div>
            </div>
            {products.length > 0 ? <h6 className='products_FromStore'>Products From Store</h6>:<h6 className='products_FromStore'>No Products</h6>}
            <div className="product-grid">
                        
                    {products.map(product => (
                        <div key={product._id} className="product-card" onClick={() =>handleNavigateDetail(product.sku)}>
                            <img src={`http://localhost:5000/${product.images[0]}`} alt={product.name} className="product-image" />
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-price"> ₹ {product.price}</p>
                            <p className="product-discount-price">
                                ₹ {calculateDiscountPrice(product.price, product.discount)}
                            </p>
                            <p className="product-save">Save ₹ {product.price - calculateDiscountPrice(product.price, product.discount)}</p>
                        </div>
                    ))}
                </div>
          
        </div>
        </>
       
    );
};

export default VendorDetail;
