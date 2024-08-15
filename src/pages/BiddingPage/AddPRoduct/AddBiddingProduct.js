import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddBidding.css';

const AddBiddingProduct = () => {
    const { storeId } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        category: '',
        description: '',
        price: '',
        biddingStartTime: '',
        biddingEndTime: '',
        quantity: '',
        highlights: '',
        description1: '',
        description2: '',
    });
    const [images, setImages] = useState([]);
    const [color, setColor] = useState([]);
    const [description1Img, setDescription1Img] = useState(null);
    const [description2Img, setDescription2Img] = useState(null);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'images') {
            setImages(files);
        } else if (name === 'color') {
            setColor(files);
        } else if (name === 'description1Img') {
            setDescription1Img(files[0]);
        } else if (name === 'description2Img') {
            setDescription2Img(files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append('name', formData.name);
        form.append('brand', formData.brand);
        form.append('category', formData.category);
        form.append('description', formData.description);
        form.append('price', formData.price);
        form.append('biddingStartTime', formData.biddingStartTime);
        form.append('biddingEndTime', formData.biddingEndTime);
        form.append('quantity', formData.quantity);
        form.append('store', storeId);
        form.append('highlights', formData.highlights);

        Array.from(images).forEach((image) => {
            form.append('images', image);
        });

        Array.from(color).forEach((colorFile) => {
            form.append('color', colorFile);
        });

        if (description1Img) {
            form.append('description1Img', description1Img);
        }

        if (description2Img) {
            form.append('description2Img', description2Img);
        }

        form.append('description1', formData.description1);
        form.append('description2', formData.description2);

        try {
            const response = await axios.post(`http://localhost:5000/bidding/add-product/${storeId}`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            toast.success(response.data.message || 'OTP Verified Successfully!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            // Optionally reset the form or redirect
            setFormData({
                name: '',
                brand: '',
                category: '',
                description: '',
                price: '',
                biddingStartTime: '',
                biddingEndTime: '',
                quantity: '',
                highlights: '',
                description1: '',
                description2: '',
            });
            setImages([]);
            setColor([]);
            setDescription1Img(null);
            setDescription2Img(null);
        } catch (error) {
            toast.error(error.response.data.error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
    };

    return (
        <div className="add-product-container">
            <h2>Add Bidding Product</h2>
            <form onSubmit={handleSubmit} className="add-product-form">
                <div className="form-group">
                    <label>Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter product name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Brand</label>
                    <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        placeholder="Enter brand"
                    />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        placeholder="Enter category"
                    />
                </div>
                <div className="form-group">
                    <label>Full Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter full description"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="Enter price"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Bidding Start Time</label>
                    <input
                        type="datetime-local"
                        name="biddingStartTime"
                        value={formData.biddingStartTime}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Bidding End Time</label>
                    <input
                        type="datetime-local"
                        name="biddingEndTime"
                        value={formData.biddingEndTime}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        placeholder="Enter quantity"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Highlights (comma-separated)</label>
                    <input
                        type="text"
                        name="highlights"
                        value={formData.highlights}
                        onChange={handleInputChange}
                        placeholder="Enter highlights"
                    />
                </div>
                <div className="form-group">
                    <label>Images</label>
                    <input
                        type="file"
                        name="images"
                        multiple
                        onChange={handleFileChange}
                    />
                </div>
                <div className="form-group">
                    <label>Color Options</label>
                    <input
                        type="file"
                        name="color"
                        multiple
                        onChange={handleFileChange}
                    />
                </div>
                <div className="form-group">
                    <label>Description 1</label>
                    <textarea
                        name="description1"
                        value={formData.description1}
                        onChange={handleInputChange}
                        placeholder="Enter description 1"
                    />
                </div>
                <div className="form-group">
                    <label>Description 1 Image</label>
                    <input
                        type="file"
                        name="description1Img"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="form-group">
                    <label>Description 2</label>
                    <textarea
                        name="description2"
                        value={formData.description2}
                        onChange={handleInputChange}
                        placeholder="Enter description 2"
                    />
                </div>
                <div className="form-group">
                    <label>Description 2 Image</label>
                    <input
                        type="file"
                        name="description2Img"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className="submit-button">Add Product</button>
            </form>
            <ToastContainer/>
        </div>
    );
};

export default AddBiddingProduct;
