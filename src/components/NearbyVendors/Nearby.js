import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Nearby.css'; // Make sure to create this CSS file for styles

const Nearby = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get('http://localhost:5000/nearby/store', {
          withCredentials: true,
        });
        setStores(response.data.stores);
      } catch (error) {
        console.error('Error fetching nearby stores:', error);
      }
    };

    fetchStores();
  }, []);

  return (
    <div className="nearby-container">
      {stores.length === 0 ? (
        <p>No nearby vendors found.</p>
      ) : (
        <div className="category-container">
      <p className="category-title">Vendors Near You</p>
      <div className="category-grid">
        {stores.map((product, index) => (
          <div
            className="category-item"
            // onClick={() => handleLink(product.link, product.subCategories)}
            key={index}
          >
            <img
              src={`http://localhost:5000/${product.logo}`}
              alt={product.category}
              className="category-image"
            />
            <p className="category-name">{product.name}</p>
          </div>
        ))}
      </div>
    </div>
      )}
    </div>
  );
};

export default Nearby;
