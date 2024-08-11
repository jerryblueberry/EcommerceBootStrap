import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './JoinSeller.css';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const JoinSeller = () => {
  const { userId } = useParams();
  const [panCard, setPanCard] = useState(null);
  const [storeRegistration, setStoreRegistration] = useState(null);
  const [identityCard, setIdentityCard] = useState(null);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'panCard') setPanCard(files[0]);
    if (name === 'storeRegistration') setStoreRegistration(files[0]);
    if (name === 'identityCard') setIdentityCard(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!panCard || !storeRegistration || !identityCard) {
      toast.error('Please upload all required documents.');
      return;
    }

    const formData = new FormData();
    formData.append('panCard', panCard);
    formData.append('storeRegistration', storeRegistration);
    formData.append('identityCard', identityCard);

    try {
      const { data } = await axios.post(`http://localhost:5000/store/seller/documents`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true, // Ensure cookies are sent
      });
      toast.success(data.message);
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || 'Failed to submit documents. Please try again.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="join-seller-container">
      <h2>Join as a Seller</h2>
      <p>Please upload the required documents for verification.</p>
      
      <form onSubmit={handleSubmit} className="join-seller-form">
        <div className="form-group">
          <label>PAN Card
            <HelpOutlineIcon title="Upload your PAN card for identity verification." className="help-icon" />
          </label>
          <input type="file" name="panCard" onChange={handleFileChange} required />
        </div>

        <div className="form-group">
          <label>Store Registration
            <HelpOutlineIcon title="Upload your store registration document." className="help-icon" />
          </label>
          <input type="file" name="storeRegistration" onChange={handleFileChange} required />
        </div>

        <div className="form-group">
          <label>Identity Card
            <HelpOutlineIcon title="Upload the owner's identity card (e.g., driving license, passport)." className="help-icon" />
          </label>
          <input type="file" name="identityCard" onChange={handleFileChange} required />
        </div>

        <button type="submit" className="submit-btn">Submit Documents</button>
      </form>
      
      <ToastContainer />
    </div>
  );
};

export default JoinSeller;
