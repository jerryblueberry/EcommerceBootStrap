import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import GradeIcon from '@mui/icons-material/Grade';
import './css/MobilePhone.css';
import MobileSidebar from '../../components/Sidebar/mobile/MobileSidebar';
import MenCategories from './ComponentsCategories/MenCategories';
import Header from '../../components/header/Header';

// Function to format price with commas and currency symbol
const formatPrice = (value, currencySymbol = '₹') => {
  if (isNaN(value)) return `${currencySymbol}0.00`;

  const formattedValue = value.toFixed(2);
  const [integerPart, decimalPart] = formattedValue.split('.');
  const integerWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return `${currencySymbol}${integerWithCommas}.${decimalPart}`;
};

const MobilePhone = () => {
  const [productsByBrand, setProductsByBrand] = useState({});
  const { category } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/product/mobile/brands?brands=apple,samsung,google'
        );
        const groupedProducts = groupProductsByBrand(response.data);
        setProductsByBrand(groupedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const groupProductsByBrand = (products) => {
    return products.reduce((acc, product) => {
      if (!acc[product.brand]) {
        acc[product.brand] = [];
      }
      acc[product.brand].push(product);
      return acc;
    }, {});
  };

  const getImageUrl = (imagePath) => {
    const formattedPath = imagePath.replace(/\\/g, '/');
    return `http://localhost:5000/${formattedPath}`;
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * discount) / 100;
  };

  const handleCardClick = (sku) => {
    console.log('clicked', sku);
    navigate(`/detail/${sku}`);
  };

  return (
    <div>
    <Header/>
         <div className="mobile-phone-container">
      {/* <MobileSidebar /> */}
      {category !== 'mobilephone' ? (
        <MenCategories /> 
      ) : (
        <div className="product-container">
          {Object.entries(productsByBrand).map(([brand, products]) => (
            <div className="brand-section" key={brand}>
              <div className="brand-header">
                <p className="text-header">{brand} Smartphones</p>
                {/* <a href={`/products/${brand}`} className="view-all">
                  View All
                </a> */}
                <p className='view-all'>View All</p>
              </div>
              <div className="product-grid">
                {products.map((product) => (
                  <div key={product._id} className="product-card">
                    <div
                      onClick={() => handleCardClick(product.sku)}
                      className="cursor_p"
                    >
                      <img
                        src={getImageUrl(product.images[0])}
                        alt={product.name}
                        className="product-image"
                      />
                      <h6 className="product-name">{product.name}</h6>
                    </div>

                    <div className="rating-section">
                      <GradeIcon className="rating-icon" />
                      <span className="rating-text">{product.rating}</span>
                    </div>
                    <div className="pricing_section">
                      <p className="discount_price">
                        {formatPrice(
                          calculateDiscountedPrice(
                            product.price,
                            product.discount
                          )
                        )}
                      </p>
                      <p className="original-price">
                        {formatPrice(product.price)}
                      </p>

                      <p className="discount-text">{product.discount}% off</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
 
  );
};

export default MobilePhone;
