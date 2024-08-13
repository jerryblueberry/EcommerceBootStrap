import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './AddProduct.css'; // Custom CSS for styling

const AddProduct = () => {
  const {storeId} = useParams();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subCategory: '',
    size: '',
    rating: '',
    review: '',
    description: '',
    price: '',
    quantity: '',
    sku: '',
    discount: '',
    tags: '',
    brand: '',
    dimensions: { length: '', width: '', height: '' },
    weight: '',
    status: 'in stock',
    ram: '',
    storage: '',
    offers: '',
    highlights: '',
  });

  const [images, setImages] = useState([]);
  const [colorFiles, setColorFiles] = useState([]);
  const [description1Img, setDescription1Img] = useState(null);
  const [description2Img, setDescription2Img] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'images') {
      setImages([...files]);
    } else if (name === 'color') {
      setColorFiles([...files]);
    } else if (name === 'description1Img') {
      setDescription1Img(files[0]);
    } else if (name === 'description2Img') {
      setDescription2Img(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'ram' || key === 'storage' || key === 'offers' || key === 'highlights') {
        productData.append(key, formData[key].split(','));
      } else if (key === 'dimensions') {
        productData.append('dimensions.length', formData.dimensions.length);
        productData.append('dimensions.width', formData.dimensions.width);
        productData.append('dimensions.height', formData.dimensions.height);
      } else {
        productData.append(key, formData[key]);
      }
    });

    images.forEach((file) => productData.append('images', file));
    colorFiles.forEach((file) => productData.append('color', file));
    if (description1Img) productData.append('description1Img', description1Img);
    if (description2Img) productData.append('description2Img', description2Img);

    try {
      const response = await axios.post(
        `http://localhost:5000/product/add-product/${storeId}`,
        productData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials:true
        }
      );
      console.log(response.data);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product.');
    }
  };

  return (
    <form className="add-product-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label>Category:</label>
        <input type="text" name="category" value={formData.category} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label>Sub-Category:</label>
        <input type="text" name="subCategory" value={formData.subCategory} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label>Price:</label>
        <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label>Discount</label>
        <input type="number" name="discount" value={formData.discount} onChange={handleInputChange}  />
      </div>
      <div className="form-group">
        <label>Quantity:</label>
        <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label>SKU:</label>
        <input type="text" name="sku" value={formData.sku} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleInputChange} maxLength="1000" required />
      </div>
      <div className="form-group">
        <label>RAM (comma-separated):</label>
        <input type="text" name="ram" value={formData.ram} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Storage (comma-separated):</label>
        <input type="text" name="storage" value={formData.storage} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Offers (comma-separated):</label>
        <input type="text" name="offers" value={formData.offers} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Size (comma-separated):</label>
        <input type="text" name="size" value={formData.size} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Highlights (comma-separated):</label>
        <input type="text" name="highlights" value={formData.highlights} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label>Images:</label>
        <input type="file" name="images" onChange={handleFileChange} multiple />
      </div>
      <div className="form-group">
        <label>Color Images:</label>
        <input type="file" name="color" onChange={handleFileChange} multiple />
      </div>
      <div className="form-group">
        <label>Description Image 1:</label>
        <input type="file" name="description1Img" onChange={handleFileChange} />
      </div>
      <div className="form-group">
        <label>Description Image 2:</label>
        <input type="file" name="description2Img" onChange={handleFileChange} />
      </div>
      <button type="submit" className="submit-btn">Add Product</button>
    </form>
  );
};

export default AddProduct;
