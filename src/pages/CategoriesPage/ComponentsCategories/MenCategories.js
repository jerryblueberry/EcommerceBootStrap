import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import GradeIcon from '@mui/icons-material/Grade';
import './SubCategories.css'
// Function to format price with commas and currency symbol
const formatPrice = (value, currencySymbol = '₹') => {
  if (isNaN(value)) return `${currencySymbol}0.00`;

  const formattedValue = value.toFixed(2);
  const [integerPart, decimalPart] = formattedValue.split('.');
  const integerWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return `${currencySymbol}${integerWithCommas}.${decimalPart}`;
};

const MenCategories = () => {
  const [productsByBrand, setProductsByBrand] = useState({});
  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const subCategories = location.state?.subCategories || [];

  console.log("SUBCATEGORIES", subCategories);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Construct the query string dynamically
        const subCategoriesQuery = subCategories.join(',');

        const response = await axios.get(
          `http://localhost:5000/product/${category}?subCategories=${subCategoriesQuery}`
        );

        const groupedProducts = groupProductsByBrand(response.data);
        setProductsByBrand(groupedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category, subCategories]);

  const groupProductsByBrand = (products) => {
    return products.reduce((acc, product) => {
      if (!acc[product.subCategory]) {
        acc[product.subCategory] = [];
      }
      // Check if the product already exists in the array
      const exists = acc[product.subCategory].some(p => p._id === product._id);
      if (!exists) {
        acc[product.subCategory].push(product);
      }
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
    <div className="mobile-phone-container">
      <div className="product-container">
        {Object.entries(productsByBrand).map(([brand, products]) => (
          <div className="brand-section" key={brand}>
            <div className="brand-header_category">
              <p className="text-header_category">{brand} </p>
              <a href={`/products/${brand}`} className="view-all">
                View All
              </a>
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
                    <p className="product-name">{product.name}</p>
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
    </div>
  );
};

export default MenCategories;
