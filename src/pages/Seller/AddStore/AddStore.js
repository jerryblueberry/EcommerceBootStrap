import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MapView from '../../../components/MapView/MapView';
import { useNavigate } from 'react-router-dom';
import './AddStore.css';

const AddStore = () => {
  const navigation = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [logo, setLogo] = useState(null);

  const [storeStatus,setStoreStatus] = useState('');
  const [storeId,setStoreId] = useState('');
  useEffect(() => {
    const fetchStoreStatus = async () => {
      try {
        const api = 'http://localhost:5000/store/seller/store-verify';
        const response = await axios.get(api, {
          withCredentials: true,  
        });

        console.log("API Response:", response.data.store); 

      
        if (response.data.store && response.data.store.length > 0) {
          setStoreStatus(response.data.store[0].status || 'Status not available');
          setStoreId(response.data.store[0]._id);
        } else {
          setStoreStatus('No store found');
        }
      } catch (error) {
        console.error("Error Occurred While fetching store status", error);
        setStoreStatus('Error fetching store status');
      }
    };

    fetchStoreStatus();
  }, []);
  console.log(storeStatus);


  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleMapClick = ([lat, lng]) => {
    setLatitude(lat);
    setLongitude(lng);
  };





  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('address', address);
    formData.append('category', category);
    formData.append('contactNo', contactNo);
    formData.append('longitude', longitude);
    formData.append('latitude', latitude);
    if (logo) formData.append('logo', logo);

    try {
      const { data } = await axios.post('http://localhost:5000/store/create-store', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.error || 'Failed to create store. Please try again.');
    }
  };
  useEffect(() => {
    if(storeStatus ==="pending"){
      navigation(`/store/section/${storeId}`)
      // navigation('/login');
      //  here i will navigate it to the add store page
      //  need to add the new field in status for store newUser
      // then after posting the store it gets pending then from there admin plays role
    }
  })

  return (
    <div>
    <p>Status:{storeStatus}</p>
        <div className="create-store-container">
      <h2>Create Store</h2>
      <form onSubmit={handleSubmit} className="create-store-form">
        <div className="form-group">
          <label>Store Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Contact No</label>
          <input type="text" value={contactNo} onChange={(e) => setContactNo(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Upload Logo</label>
          <input type="file" onChange={handleFileChange} />
        </div>

        <div className="form-group">
          <label>Choose Location on Map</label>
          <MapView onMapClick={handleMapClick} />
          <input type="hidden" name="longitude" value={longitude} />
          <input type="hidden" name="latitude" value={latitude} />
        </div>

        <button type="submit" className="submit-btn">Create Store</button>
      </form>

      <ToastContainer />
    </div>

    </div>

  );
};

export default AddStore;
