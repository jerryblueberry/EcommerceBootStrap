import React, { useState } from 'react';
import { Card, Form, Button, Image } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../assets/images/logo192.png';
import '../assets/css/Login.css';
import Cookies from 'js-cookie';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/user/login', {
        email,
        password,
      });
      // Set the token as a cookie
      Cookies.set('jwt', response.data.token, { expires: 15 }); // Set cookie with a 15-day expiry
      Cookies.set('userName', response.data.user.name); // Set username in cookie
      
      // window.location.reload(); // Reload the page
      console.log('Login Successful');
      if (response.status === 200) {
        
        navigate('/',{email});
      }
    } catch (error) {
      console.error('Login Failed:', error.response.data);
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
    <div className="container mt-5">
      <Card className="mx-auto" style={{ maxWidth: '400px' }}>
        <Card.Body>
          <div className="text-center mb-4">
            <Image src={Logo} alt="Logo" style={{ maxWidth: '150px' }} />
          </div>
          <h3 className="text-center mb-4">Login</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Check
                type="checkbox"
                label="Show Password"
                onClick={togglePasswordVisibility}
              />
            </Form.Group>
    
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
          <div className='text-center mt-3'>
            <p><Link to = '/forget-password'>Forget Password?</Link></p>
          </div>
          <div className="text-center mt-3">
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          </div>
        </Card.Body>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default Login;
