import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewAll.css'; 
import { useNavigate,useParams } from 'react-router-dom';
import Header from '../../components/header/Header';

const ViewAll = () => {
    const [products, setProducts] = useState([]);
    const {subCategory} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/product/view-all/${subCategory}`);
                setProducts(response.data.products);
            } catch (error) {
                console.log("Error fetching products", error);
            }
        };
        fetchProducts();
    }, []);

    const calculateDiscountPrice = (price, discount) => {
        return price - (price * (discount / 100));
    };
    const handleDetailNavigate = (sku) => {
        navigate(`/detail/${sku}`)
    }

    return (
        <>
            <Header/>
            
            <div className="product-grid">
           
         
            {products.map(product => (
                <div key={product._id} className="product-card" onClick={() =>handleDetailNavigate(product.sku)}>
                    <img src={`http://localhost:5000/${product.images[0]}`} alt={product.name} className="product-image" />
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-brand">{product.brand}</p>
                    <p className="product-price">Rs {product.price}</p>
                    <p className="product-discount-price">
                        Rs {calculateDiscountPrice(product.price, product.discount)}
                    </p>
                    <p className="product-save">Save Rs {product.price - calculateDiscountPrice(product.price, product.discount)}</p>
                    {/* <p className="product-offers">{product.offers.length > 0 ? product.offers[0] : "No offers available"}</p> */}
                </div>
            ))}
        </div>
        </>
    
    );
};

export default ViewAll;
