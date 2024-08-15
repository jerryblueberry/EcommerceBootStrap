import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import './Detail.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/header/Header';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import GradeIcon from '@mui/icons-material/Grade';
import SpecsMobile from './componentMObile/SpecsMobile';

const Detail = () => {
  const navigate = useNavigate();
  const { sku } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [similarProducts, setSimilarProducts] = useState([]);
  const [vendorProducts, setVendorProducts] = useState([]);
  const [cartLoading,setCartLoading] = useState(false);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/product/detail/${sku}`
      );
      setProduct(response.data.product);
      setSelectedImage(response.data.product.images[0]);
      setVendorProducts(response.data.recommendations?.vendorProducts);
      setSimilarProducts(response.data.recommendations?.similarProducts);
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
  };
  const handleAddToCart = async (productId,quantity,price) => {
    setCartLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/cart/add-cart',
        { product: productId, quantity },
        { withCredentials: true }
      );
      toast.success('Product added to cart successfully!', {
        position: "top-right",
      });
      console.log('Cart updated:', response.data.savedCart);
    } catch (error) {
      toast.error('Failed to add product to cart. Please try again.', {
        position: "top-right",
      });
      console.error('Error adding to cart:', error);
    } finally {
      setCartLoading(false);
    }
  };

  const handleSimilarNavigation =(sku) => {
    navigate(`/detail/${sku}`);
  }
  const handleVendorNavigation = (sku) => {
    navigate(`/detail/${sku}`)
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
            <div>
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
              <div className='add_toCart' onClick={()=>handleAddToCart(product._id,product.quantity)}>
              <i className="ri-shopping-cart-line"></i>
                <h5 className='text_cart'>Add to Cart</h5>
              </div>
            </div>
          </div>

          <div className="detail-product">
            <h6 className="product_name">{product.name}</h6>
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
                  Extra ₹
                  {formatPrice(extraPriceOff(product.price, product.discount))}{' '}
                  off
                </p>
              )}
              <div className="price_section">
                <h6 className="discounted-price">
                  ₹
                  {formatPrice(
                    discountedPrice(product.price, product.discount)
                  )}
                </h6>
                <h6 className="price"> ₹{formatPrice(product.price)}</h6>
                <h6 className="discount">{product.discount}% off</h6>
              </div>
            </div>

            {/* <p>Description: {product.description}</p>
            <p>Review: {product.review}</p>
            <p>Colors: {product.color[0]}</p>
            <p>Sizes: {product.size[0]}</p> */}

            <SpecsMobile
              onColorSelect={handleColorSelection}
              description={product?.description}
              description1={product?.productDescription?.description1}
              description2={product?.productDescription?.description2}
              description1Img={product?.productDescription?.description1Img}
              description2Img={product?.productDescription?.description2Img}
              seller={product?.storeId?.name}
              color={product.color}
              rom={product?.storage}
              ram={product?.ram}
              offers={product?.offers}
              highlights={product?.highlights}
            />
          </div>
        </div>
        {/* <p>{product.storeId.name}</p> */}

        {/* for the component  */}

        <div className="product-sections">
          {/* Similar Products */}
          <div className="similar-products-section">
            <h2>Similar Products</h2>
            <div className="product-list">
              {similarProducts.map((similar, index) => (
                <div className="product-card" key={index} onClick={() =>handleSimilarNavigation(similar.sku)}>
                  <img
                    className="product-image"
                    src={`http://localhost:5000/${similar.images[0]}`}
                    alt={similar.name}
                  />
                  <p className="product-name">{similar.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* More from Vendor */}
          <div className="vendor-products-section">
            <h2>More from Vendor</h2>
            <div className="product-list">
              {vendorProducts.map((vendor, index) => (
                <div className="product-card" key={index} onClick={() => handleVendorNavigation(vendor.sku)}>
                  <img
                    className="product-image"
                    src={`http://localhost:5000/${vendor.images[0]}`}
                    alt={vendor.name}
                  />
                  <h6 style={{
                    fontSize:'17px',
                  }} className="product-name">{vendor.name}</h6>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
