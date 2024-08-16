import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Nearby.css'; // Make sure to create this CSS file for styles

const Nearby = () => {
  const navigate = useNavigate();
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
  const handleLink   = (storeId) => {
    navigate(`/vendor/${storeId}`);
  }

  return (
    <div className="nearby-container">
      {stores.length === 0 ? (
        <p style={{
          display:'flex',
          justifyContent:'center',
          fontSize:'21px',
          fontWeight:'600',
          color:'#555555',
          fontFamily:'sans-serif'
        }}>No nearby vendors found.</p>
      ) : (
        <div className="category-container">
      <p className="category-title">Vendors Near You</p>
      <div className="category-grid">
        {stores.map((product, index) => (
          <div
            className="category-item"
            onClick={() => handleLink(product._id)}
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
