import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BiddingDetail.css';
import { useParams } from 'react-router-dom';

const BiddingDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bidAmount, setBidAmount] = useState('');
    const [bidError, setBidError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/bidding/product/${productId}`, {
                    withCredentials: true
                });
                setProduct(response.data);
            } catch (error) {
                toast.error('Error fetching product details', { position: 'top-right' });
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId,bidAmount]);

    const handleBidChange = (e) => {
        setBidAmount(e.target.value);
        setBidError('');
    };

    const handleBidSubmit = async (e) => {
        e.preventDefault();

        if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
            setBidError('Please enter a valid bid amount');
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:5000/bidding/place-bid/${productId}`,
                { amount: bidAmount },
                { withCredentials: true }
            );
            // Update the product with the new bid information
            setProduct(response.data);
            setBidAmount('');
            toast.success('Bid placed successfully', { position: "top-right" });
        } catch (error) {
            toast.error('Error placing bid', { position: 'top-right' });
        }
    };

    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    if (!product) {
        return <div className="error">Product not found</div>;
    }

    return (
        <div className="product-detail-container">
            <div className="product-images">
                {product.images && product.images.map((img, index) => (
                    <img key={index} src={`http://localhost:5000/${img}`} alt={product.name} className="product-image" />
                ))}
            </div>
            <div className="product-info">
                <h1 className="product-name">{product.name}</h1>
                <h2 className="product-brand">{product.brand}</h2>
                <p className="product-category">Category: {product.category}</p>
                <p className="product-description">{product.description}</p>
                <p className="product-price">Initial Price: ₹{product.price}</p>
                <p className="product-bid-info">Highest Bid: ₹ {product.highestBid}</p>
                <p className="product-bidder">Highest Bidder: {product.highestBidder}</p>
                <p className="product-time">Remaining Time: {product.remainingTime}</p>
                <div className="bid-form-container">
                    <h2>Place Your Bid</h2>
                    <form onSubmit={handleBidSubmit} className="bid-form">
                        <input 
                            type="number" 
                            value={bidAmount} 
                            onChange={handleBidChange} 
                            className="bid-input" 
                            placeholder="Enter bid amount"
                        />
                        <button type="submit" className="place-bid-button">Place Bid</button>
                        {bidError && <p className="bid-error">{bidError}</p>}
                    </form>
                </div>
                <div className="product-highlights">
                    <h3>Highlights:</h3>
                    <ul>
                        {product.highlights && product.highlights.map((highlight, index) => (
                            <li key={index}>{highlight}</li>
                        ))}
                    </ul>
                </div>
                <div className="product-colors">
                    <h3>Available Colors:</h3>
                    {product.color && product.color.map((colorImg, index) => (
                        <img key={index} src={`http://localhost:5000/${colorImg}`} alt={`Color ${index}`} className="color-image" />
                    ))}
                </div>
                <div className="product-descriptions">
                    <h3>Description 1:</h3>
                    <p>{product.productDescription?.description1}</p>
                    {product.productDescription?.description1Img && (
                        <img src={`http://localhost:5000/${product.productDescription.description1Img}`} alt="Description 1" className="desc-image" />
                    )}
                    <h3>Description 2:</h3>
                    <p>{product.productDescription?.description2}</p>
                    {product.productDescription?.description2Img && (
                        <img src={`http://localhost:5000/${product.productDescription.description2Img}`} alt="Description 2" className="desc-image" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default BiddingDetail;
