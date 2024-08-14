import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProductEdit = () => {
  const { sku } = useParams();
  const navigate = useNavigate();

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
    discount: '',
    tags: '',
    brand: '',
    dateAdded: '',
    dimensions: { length: '', width: '', height: '' },
    weight: '',
    status: 'in stock',
    ram: '',
    storage: '',
    offers: '',
    highlights: '',
    description1: '',
    description2: ''
  });
console.log("FOrm IMAGE",formData.images)
  const [images, setImages] = useState([]);
  const [colorFiles, setColorFiles] = useState([]);
  const [description1Img, setDescription1Img] = useState(null);
  const [description2Img, setDescription2Img] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/product/detail/${sku}`, {
          withCredentials: true,
        });
        const data = response.data.product;

        setFormData({
            storeId:data.storeId || '',
          name: data.name || '',
          category: data.category || '',
          subCategory: data.subCategory || '',
          size: data.size || '',
          rating: data.rating || '',
          review: data.review || '',
          description: data.description || '',
          price: data.price || '',
          quantity: data.quantity || '',
          discount: data.discount || '',
          tags: data.tags || '',
          brand: data.brand || '',
          dateAdded: data.dateAdded || '',
          dimensions: data.dimensions || { length: '', width: '', height: '' },
          weight: data.weight || '',
          status: data.status || 'in stock',
          ram: data.ram ? data.ram.join(',') : '',
          storage: data.storage ? data.storage.join(',') : '',
          offers: data.offers ? data.offers.join(',') : '',
          highlights: data.highlights ? data.highlights.join(',') : '',
          description1: data.productDescription?.description1 || '',
          description2: data.productDescription?.description2 || '',
        });

        setImages(data.images || []);
        setColorFiles(data.color || []);
        setDescription1Img(data.productDescription?.description1Img || null);
        setDescription2Img(data.productDescription?.description2Img || null);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [sku]);
  console.log(images)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('dimensions')) {
      const dimensionField = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        dimensions: {
          ...prevData.dimensions,
          [dimensionField]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'images') {
      setImages(Array.from(files));
    } else if (name === 'color') {
      setColorFiles(Array.from(files));
    } else if (name === 'description1Img') {
      setDescription1Img(files[0] || null);
    } else if (name === 'description2Img') {
      setDescription2Img(files[0] || null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = new FormData();

    // Append form data
    Object.keys(formData).forEach((key) => {
        if (key === 'ram' || key === 'storage' || key === 'offers' || key === 'highlights') {
            productData.append(key, formData[key]);
        } else if (key === 'dimensions') {
            productData.append('dimensions.length', formData.dimensions.length);
            productData.append('dimensions.width', formData.dimensions.width);
            productData.append('dimensions.height', formData.dimensions.height);
        } else {
            productData.append(key, formData[key]);
        }
    });

    // Append existing images if no new images have been selected
    if (images.length > 0) {
        images.forEach((img) => {
            if (img instanceof File) {
                productData.append('images', img);
            } else {
                // Append the URL of the existing image
                productData.append('images', img);
            }
        });
    }

    // Append existing color files if no new color files have been selected
    if (colorFiles.length > 0) {
        colorFiles.forEach((file) => {
            if (file instanceof File) {
                productData.append('color', file);
            } else {
                // Append the URL of the existing color file
                productData.append('color', file);
            }
        });
    }

    // Append the existing or new description1Img
    if (description1Img) {
        if (description1Img instanceof File) {
            productData.append('description1Img', description1Img);
        } else {
            productData.append('description1Img', description1Img);  // Append the URL of the existing image
        }
    }

    // Append the existing or new description2Img
    if (description2Img) {
        if (description2Img instanceof File) {
            productData.append('description2Img', description2Img);
        } else {
            productData.append('description2Img', description2Img);  // Append the URL of the existing image
        }
    }

    try {
        const response = await axios.put(
            `http://localhost:5000/product/update/${sku}`,
            productData,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            }
        );
        console.log('Response data:', response.data);
        alert('Product updated successfully!');
        navigate(`/store/section/${formData.storeId._id}`);
    } catch (error) {
        console.error('Error updating product:', error);
        alert('Failed to update product.');
    }
};



  return (
    <form className="product-edit-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Category:</label>
        <input type="text" name="category" value={formData.category} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Sub-Category:</label>
        <input type="text" name="subCategory" value={formData.subCategory} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Size:</label>
        <input type="text" name="size" value={formData.size} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Rating:</label>
        <input type="number" name="rating" value={formData.rating} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Review:</label>
        <textarea name="review" value={formData.review} onChange={handleInputChange}></textarea>
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleInputChange}></textarea>
      </div>
      <div className="form-group">
        <label>Price:</label>
        <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Quantity:</label>
        <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Discount:</label>
        <input type="number" name="discount" value={formData.discount} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Tags:</label>
        <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Brand:</label>
        <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Date Added:</label>
        <input type="date" name="dateAdded" value={formData.dateAdded} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Dimensions (Length):</label>
        <input type="number" name="dimensions.length" value={formData.dimensions.length} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Dimensions (Width):</label>
        <input type="number" name="dimensions.width" value={formData.dimensions.width} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Dimensions (Height):</label>
        <input type="number" name="dimensions.height" value={formData.dimensions.height} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Weight:</label>
        <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Status:</label>
        <input type="text" name="status" value={formData.status} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>RAM:</label>
        <input type="text" name="ram" value={formData.ram} onChange={handleInputChange} placeholder="Separate by comma" />
      </div>
      <div className="form-group">
        <label>Storage:</label>
        <input type="text" name="storage" value={formData.storage} onChange={handleInputChange} placeholder="Separate by comma" />
      </div>
      <div className="form-group">
        <label>Offers:</label>
        <input type="text" name="offers" value={formData.offers} onChange={handleInputChange} placeholder="Separate by comma" />
      </div>
      <div className="form-group">
        <label>Highlights:</label>
        <input type="text" name="highlights" value={formData.highlights} onChange={handleInputChange} placeholder="Separate by comma" />
      </div>
      <div className="form-group">
        <label>Description 1:</label>
        <textarea name="description1" value={formData.description1} onChange={handleInputChange}></textarea>
      </div>
      <div className="form-group">
        <label>Description 2:</label>
        <textarea name="description2" value={formData.description2} onChange={handleInputChange}></textarea>
      </div>
      <div className="form-group">
        <label>Product Images:</label>
        <input type="file"  name="images" multiple onChange={handleFileChange} />
      </div>
      {/* <div className="form-group"> */}
      <div className="form-group">
        <label>Color Images:</label>
        <input type="file" name="color" multiple onChange={handleFileChange} />
      </div>
      <div className="form-group">
        <label>Description Image 1:</label>
        <input type="file" name="description1Img" onChange={handleFileChange} />
      </div>
      <div className="form-group">
        <label>Description Image 2:</label>
        <input type="file" name="description2Img" value={formData.description2Img} onChange={handleFileChange} />
      </div>
      <button type="submit">Update Product</button>
    </form>
  );
};

export default ProductEdit;
