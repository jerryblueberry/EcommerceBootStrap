import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './GetAllBidding.css'; 
import Header from '../../../components/header/Header';


const GetAllBidding = () => {
    const [products, setProducts] = useState([]);
    const navigation = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/bidding/products',{
                    withCredentials:true
                });
                setProducts(response.data.productsWithHighestBid);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleNavigation = (productId) => {
        navigation(`/bidding-product/${productId}`)
    }
    return (
        <>
            <Header/>
            <div className="products-grid">
            {products.length > 0 ? (
                products.map(product => (
                    <div key={product._id} className="product-card" onClick={() => handleNavigation(product._id)}>
                        <img 
                            src={`http://localhost:5000/${product.images[0]}`} 
                            alt={product.name} 
                            className="product-image" 
                        />
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            {/* <p><strong>Brand:</strong> {product.brand}</p> */}
                            {/* <p><strong>Category:</strong> {product.category}</p> */}
                            {/* <p>{product.description}</p> */}
                            <p><strong>Price:</strong> ₹{product.price}</p>
                            <p><strong>Highest Bid:</strong> ₹{product.highestBid}</p>
                            <p><strong>Highest Bidder:</strong> {product.highestBidder}</p>
                            {/* <p><strong>Store:</strong> {product.store.name}</p> */}
                            {/* <p><strong>Quantity:</strong> {product.quantity}</p> */}
                            {/* <p><strong>Highlights:</strong> {product.highlights.join(', ')}</p> */}
                            {/* <p><strong>Colors:</strong></p>
                            <div className="color-swatches">
                                {product.color.map((colorImg, index) => (
                                    <img 
                                        key={index} 
                                        src={`/${colorImg}`} 
                                        alt={`Color ${index}`} 
                                        className="color-image" 
                                    />
                                ))}
                            </div> */}
                            {/* <div className="product-description-images">
                                {product.productDescription.description1Img && (
                                    <img 
                                        src={`/${product.productDescription.description1Img}`} 
                                        alt="Description 1" 
                                        className="description-image" 
                                    />
                                )}
                                {product.productDescription.description2Img && (
                                    <img 
                                        src={`/${product.productDescription.description2Img}`} 
                                        alt="Description 2" 
                                        className="description-image" 
                                    />
                                )}
                            </div> */}
                        </div>
                    </div>
                ))
            ) : (
                <p>No products available</p>
            )}
        </div>

        </>
       
    );
};

export default GetAllBidding;
