import React, { useState } from 'react';
import './SpecsMobile.css';

const SpecsMobile = ({ onColorSelect }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState('128 GB'); // Default selected storage

  const offers = [
    'Bank OfferFlat ₹750 off on HDFC Bank Credit Card EMI Txns, Tenure: 6 and 9 months, Min Txn Value: ₹7500T&C',
    'Bank OfferFlat ₹750 off on HDFC Bank Debit Card EMI Txns, Tenure: 6 and 9 months, Min Txn Value: ₹7500T&C',
    'Bank Offer10% off up to ₹1000 on HDFC Bank Credit Card EMI Txns, Tenure: 12,18,24 months, Min Txn Value: ₹7500T&C',
  ];
  const colors = [
    'https://static1.anpoimages.com/wordpress/wp-content/uploads/2023/02/samsung-galaxy-s23-ultra-lime.jpg',
    'https://tse1.mm.bing.net/th?id=OIP.vwx8CoGwAUav68uQCLGvIwHaHa&pid=Api&P=0&h=220',
    'https://tse2.mm.bing.net/th?id=OIP.EFHcOw-ryuJ_NfHXYp1iUgHaKB&pid=Api&P=0&h=220',
  ];
  const storageOptions = ['128 GB', '256 GB', '512 GB'];
  const RAM = ['4 GB', '6 GB', '8 GB', '12 GB', '14 GB'];

  const Highlights = [
    '8 GB RAM | 256GB ROM',
    '17.12cm (6.74 inch) Display',
    '50MP Rear Camera',
    '5000 mAh Battery',
  ];
  const Seller = 'Sajan Electronics';

  const handleMouseEnter = (colour) => {
    console.log(colour);
  };

  return (
    <div className="specs-mobile">
      <div>
        <h6>Available offers</h6>
        <div>
          {offers.map((offer, index) => (
            <div key={index} className="offer_list">
              <i className="ri-task-fill"></i>
              <h6 className="offer-name">{offer}</h6>
            </div>
          ))}
        </div>

        <div className="section_image_storage">
          <div className="color-images">
            <h6 className="color_text">Color</h6>
            <div className="color_section">
              {colors.map((colour, index) => (
                <div
                  key={index}
                  className={`color_available ${selectedColor === index ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedColor(index);
                    onColorSelect(colour);
                  }}
                  onMouseEnter={() => handleMouseEnter(colour)}
                >
                  <img
                    className="image_color_available"
                    src={colour}
                    alt={`Color option ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="storage_section">
            <h6 className="storage_text">Storage</h6>
            <div className="storage_options">
              {storageOptions.map((storageOption, index) => (
                <div
                  key={index}
                  className={`storage_option ${selectedStorage === storageOption ? 'selected' : ''}`}
                  onClick={() => setSelectedStorage(storageOption)}
                >
                  <p>{storageOption}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecsMobile;
