import React, { useState } from 'react';
import './SpecsMobile.css';

const SpecsMobile = ({
  onColorSelect,
  color,
  rom,
  offers,
  highlights,
  ram,
  seller,
  description,
  description1,
  description2,
  description1Img,
  description2Img,
}) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState('128 GB'); // Default selected storage
  const [selectedRam, setSelectedRam] = useState(null);

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
        {color && (
          <div className="section_image_storage">
            <div className="color-images">
              <h6 className="color_text">Color</h6>
              <div className="color_section">
                {color.map((colour, index) => (
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
                      src={`http://localhost:5000/${colour}`}
                      alt={`Color option ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            {rom && (
              <div className="storage_section">
                <h6 className="storage_text">Storage</h6>
                <div className="storage_options">
                  {rom.map((storageOption, index) => (
                    <div
                      key={index}
                      className={`storage_option ${selectedStorage === storageOption ? 'selected' : ''}`}
                      onClick={() => setSelectedStorage(storageOption)}
                    >
                      <p>{storageOption} GB</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/*  For RAM */}
        {ram && (
          <div className="storage_section_ram">
            <h6 className="storage_text_ram">RAM</h6>
            <div className="storage_options_ram">
              {ram.map((storageOption, index) => (
                <div
                  key={index}
                  className={`storage_option ${selectedRam === storageOption ? 'selected' : ''}`}
                  onClick={() => setSelectedRam(storageOption)}
                >
                  <p>{storageOption} GB</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/*  for highlights */}
        <div className="highlight_section">
          <h5>Highlights</h5>
          <div>
            {highlights.map((highlight) => (
              <ul>
                <li>{highlight}</li>
              </ul>
            ))}
          </div>
        </div>
        {/*  FOr seller */}
        <div className="seller_section">
          <h6>Seller </h6>

          <h5
            onClick={() => alert('NAvigate to seller page')}
            className="seller_name"
          >
            {seller}
          </h5>
        </div>

        {/* FOr product descriptions */}
        <div className="description_product">
          <h5>Description</h5>
          {description ? <h6>{description}</h6> : 'NA'}
        </div>

        {/*  For Product Description 2 parts more  */}
        
        <h5 className='title_description'>Product Description</h5>
        <div className="extra_description">
          {description1 && (
            <div className="part_description">
              <h6>{description1}</h6>
              <img
                src={`http://localhost:5000/${description1Img}`}
                alt="Product"
                className="responsive_img"
              />
            </div>

          )}
          <div className='border_item'></div>
          {description2 && (
            <div className="part_description">
              <h6>{description2}</h6>
              <img
                src={`http://localhost:5000/${description2Img}`}
                alt="Product2"
                className="responsive_img"
              />
            </div>
          )}


          
         
        </div>
      </div>
      
      <div>Review Left</div>
    </div>
  );
};

export default SpecsMobile;
