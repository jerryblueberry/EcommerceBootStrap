import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import './Detail.css';
import Header from '../../components/header/Header';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import GradeIcon from '@mui/icons-material/Grade';
import SpecsMobile from './componentMObile/SpecsMobile';

const Detail = () => {
  const { sku } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [similarProducts, setSimilarProducts] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/product/detail/${sku}`
      );
      setProduct(response.data.product);
      setSelectedImage(response.data.product.images[0]);
      setSimilarProducts(response.data.recommendations.similarProducts);
    } catch (error) {
      console.error('Error while fetching product', error);
      setError('Failed to fetch product details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [sku]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No product found</div>;

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const formatPrice = (price) => {
    return price.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const discountedPrice = (price, discount) => {
    return price - (price * discount) / 100;
  };

  const extraPriceOff = (price, discount) => {
    return price - discountedPrice(price, discount);
  };
  const handleColorSelection = (colour) => {
    setSelectedImage(colour);
    console.log(selectedImage);
  }

  return (
    <>
      <Header />
      <div className="product-detail">
        <div className="content_detail">
          <div className="image-gallery">
            <div className="thumbnail-gallery">
              {product.images &&
                product.images.map((image, index) => (
                  <img
                    key={index}
                    className={`thumbnail ${selectedImage === image ? 'selected' : ''}`}
                    src={`http://localhost:5000/${image}`}
                    onClick={() => handleImageClick(image)}
                    alt={image}
                  />
                ))}
            </div>
            <div className="main-image">
              <div className="wishlist-icon">
                <FavoriteBorderIcon color="action" />
              </div>
              <InnerImageZoom
                src={`http://localhost:5000/${selectedImage}`}
                zoomSrc={`http://localhost:5000/${selectedImage}`}
                alt={product.name}
                className="selected-image"
                zoomType="hover"
                zoomScale={2}
                width={500}
                height={500}
              />
            </div>
          </div>
          <div className="detail-product">
            <h6 className='product_name'>{product.name}</h6>
            <div className="rating_section">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '5px',
                  height: '30px',
                }}
              >
                <p className="product_rating">{product.rating}</p>
                <i className="ri-star-line"></i>
                {/* <GradeIcon className='icon_grade'  /> */}
                {/* left to show done by how many users */}
              </div>
            </div>
            <div>
              {product.discount && (
                <p className="extra_cash">
                  Extra ₹{formatPrice(extraPriceOff(product.price, product.discount))} off
                </p>
              )}
              <div className="price_section">
                <h6 className="discounted-price">
                  ₹{formatPrice(discountedPrice(product.price, product.discount))}
                </h6>
                <h6 className="price"> ₹{formatPrice(product.price)}</h6>
                <h6 className="discount">{product.discount}% off</h6>
              </div>
            </div>
            {/* <p>Description: {product.description}</p>
            <p>Review: {product.review}</p>
            <p>Colors: {product.color[0]}</p>
            <p>Sizes: {product.size[0]}</p> */}
            <SpecsMobile onColorSelect = {handleColorSelection} />
          </div>
         
        </div>
        
        {/* for the component  */}
     
        {/* For Similar products */}
        <p>Similar Products</p>
        {similarProducts.map((similar, index) => (
          <div key={index}>
            <p>{similar.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Detail;
