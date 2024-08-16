import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css'; 
import Header from '../../components/header/Header';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');

    // Fetch all users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin/all', { withCredentials: true });
                setUsers(response.data.users);
            } catch (error) {
                console.log("Error fetching users", error);
            }
        };
        fetchUsers();
    }, []);

    // Fetch all seller requests
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin/seller/requests', { withCredentials: true });
                setRequests(response.data.requests);
            } catch (error) {
                console.log("Error fetching seller requests", error);
            }
        };
        fetchRequests();
    }, []);

    // Update seller status
    const updateStatus = async (userId) => {
        try {
            console.log('Updating status for userId:', userId);
            const response = await axios.patch(`http://localhost:5000/admin/update/${userId}`, 
                {}, 
                { withCredentials: true }
            );
            console.log('Update response:', response);
            alert('Status updated successfully!');
            // Refresh the requests list after update
            setSelectedUserId('');
            const updatedRequests = requests.filter(req => req.userId._id !== userId);
            setRequests(updatedRequests);
        } catch (error) {
            console.error("Error updating status", error);
        }
    };
    

    return (
        <>
            <Header/>
            <div className="admin-dashboard">
                <h1>Admin Dashboard</h1>
                
                <section className="users-section">
                    <h2>Users</h2>
                    <ul className="user-list">
                        {users.length > 0 ? (
                            users.map(user => (
                                <li key={user._id} className="user-item">
                                    <p><strong>Name:</strong> {user.name}</p>
                                    <p><strong>Email:</strong> {user.email}</p>
                                </li>
                            ))
                        ) : (
                            <p>No users found.</p>
                        )}
                    </ul>
                </section>

                <section className="requests-section">
                    <h2>Seller Requests</h2>
                    <ul className="request-list">
                        {requests.length > 0 ? (
                            requests.map(request => (
                                <li key={request._id} className="request-item">
                                    <div className="request-info">
                                        <img
                                            src={`http://localhost:5000/${request.userId.profilePicture}`}
                                            alt={request.userId.name}
                                            className="request-profile-pic"
                                        />
                                        <div>
                                            <p><strong>Name:</strong> {request.userId.name}</p>
                                            <p><strong>PAN Card:</strong> <a href={`http://localhost:5000/${request.panCard}`} target="_blank" rel="noopener noreferrer">View PAN Card</a></p>
                                            <p><strong>Store Registration:</strong> <a href={`http://localhost:5000/${request.storeRegistration}`} target="_blank" rel="noopener noreferrer">View Store Registration</a></p>
                                            <p><strong>Identity Card:</strong> <a href={`http://localhost:5000/${request.identityCard}`} target="_blank" rel="noopener noreferrer">View Identity Card</a></p>
                                            <p><strong>Submitted At:</strong> {new Date(request.submittedAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="request-actions">
                                        <button
                                            onClick={() => updateStatus(request.userId._id)}
                                        >
                                            Approve
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>No seller requests found.</p>
                        )}
                    </ul>
                </section>
            </div>
        </>
    );
};

export default Admin;
