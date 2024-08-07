import React from 'react';
import './Categories.css';
import kidImg from '../../assets/images/baby.png';
import sportImg from '../../assets/images/sports-item.png';
import stationery from '../../assets/images/stationery.png';
import Bid from '../../assets/images/bid.png';
import { useNavigate } from 'react-router-dom';
const Category = () => {
  const navigation = useNavigate();
  const products = [
    {
      category: 'Electronic',
      image:
        'https://rukminim2.flixcart.com/fk-p-flap/64/64/image/4da1d0d19350cc84.jpg?q=100',
      link: 'electronics',
    },
    {
      category: 'Home & Furniture',
      image:
        'https://rukminim2.flixcart.com/fk-p-flap/64/64/image/7a5e96c10ada8a56.jpg?q=100',
      link: 'home&furniture',
    },
    { category: 'Baby & Kids', image: kidImg, link: 'kids' },
    {
      category: 'Fashion',
      image:
        'https://rukminim2.flixcart.com/fk-p-flap/64/64/image/9d4e9c605fc1d2d3.jpg?q=100',
      link: 'men',
    },
    {
      category: 'Mobiles & Tablets',
      image:
        'https://rukminim2.flixcart.com/fk-p-flap/64/64/image/44e10b16e649b691.jpg?q=100',
      link: 'mobilephone',
    },
    {
      category: 'TVs & Appliances',
      image:
        'https://rukminim2.flixcart.com/fk-p-flap/64/64/image/717b5077a5e25324.jpg?q=100',
      link: 'tvs&appliances',
    },
    {
      category: 'Beauty',
      image:
        'https://rukminim2.flixcart.com/fk-p-flap/64/64/image/a5e656672d0548dd.jpg?q=100',
      link: 'health&beauty',
    },
    { category: 'Stationery', image: stationery, link: 'books' },
    { category: 'Sports', image: sportImg, link: 'sports' },
    {
      category: 'Grocery',
      image:
        'https://rukminim2.flixcart.com/fk-p-flap/64/64/image/25f400c36bc3487d.jpg?q=100',
      link: 'grocery',
    },
    { category: 'Bidding', image: Bid, link: 'bidding' },
    {category:'Watch',image:"https://static-01.daraz.com.np/p/31853b16802ea0253051b912afef8ec8.jpg","link":"smartwatch"}
  ];

  const handleLink = (link) => {
    
    console.log(`Pressed Successfully: ${link}`);
    navigation(`category/${link}`);
  };

  return (
    <div className="category-container">
      {/* <p className="category-title">Categories</p> */}
      <div className="category-grid">
        {products.map((product, index) => (
          <div
            className="category-item"
            onClick={() => handleLink(product.link)}
            key={index}
          >
            <img src={product.image} alt={product.category} className="category-image" />
            <p className="category-name">{product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
