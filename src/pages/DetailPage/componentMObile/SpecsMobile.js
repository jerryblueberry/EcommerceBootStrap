import React, { useState } from 'react';
import './SpecsMobile.css';

const SpecsMobile = ({
  onColorSelect,
  color = [],
  rom = [],
  offers = [],
  highlights = [],
  ram = [],
  seller,
  description,
  description1,
  description2,
  description1Img,
  description2Img,
}) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(rom.length > 0 ? rom[0] : ''); // Default to first storage option if available
  const [selectedRam, setSelectedRam] = useState(ram.length > 0 ? ram[0] : '');

  const handleMouseEnter = (colour) => {
    console.log(colour);
  };

  return (
    <div className="specs-mobile">
      {/* Offers Section */}
      {offers.length > 0 && (
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
        </div>
      )}

      {/* Color and Storage Section */}
      {(color.length > 0 || rom.length > 0) && (
        <div className="section_image_storage">
          {/* Color Section */}
          {color.length > 0 && (
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
          )}

          {/* Storage Section */}
          {rom.length > 0 && (
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

      {/* RAM Section */}
      {ram.length > 0 && (
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

      {/* Highlights Section */}
      {highlights.length > 0 && (
        <div className="highlight_section">
          <h5>Highlights</h5>
          <div>
            {highlights.map((highlight, index) => (
              <ul key={index}>
                <li>{highlight}</li>
              </ul>
            ))}
          </div>
        </div>
      )}

      {/* Seller Section */}
      {seller && (
        <div className="seller_section">
          <h6>Seller </h6>
          <h5
            onClick={() => alert('Navigate to seller page')}
            className="seller_name"
          >
            {seller}
          </h5>
        </div>
      )}

      {/* Description Section */}
      {description && (
        <div className="description_product">
          <h5>Description</h5>
          <h6>{description}</h6>
        </div>
      )}

      {/* Product Description Section */}
      {(description1 || description2) && (
        <div>
          <h5 className="title_description">Product Description</h5>
          <div className="extra_description">
            {description1 && (
              <div className="part_description">
                <h6>{description1}</h6>
                {description1Img && (
                  <img
                    src={`http://localhost:5000/${description1Img}`}
                    alt="Product"
                    className="responsive_img"
                  />
                )}
              </div>
            )}
            <div className="border_item"></div>
            {description2 && (
              <div className="part_description">
                <h6>{description2}</h6>
                {description2Img && (
                  <img
                    src={`http://localhost:5000/${description2Img}`}
                    alt="Product2"
                    className="responsive_img"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Placeholder for reviews or other sections */}
      <div>Review Section (TBD)</div>
    </div>
  );
};

export default SpecsMobile;
