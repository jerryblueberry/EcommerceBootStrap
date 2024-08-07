import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './Header.css';
import Cookies from 'js-cookie';
import StorefrontSharpIcon from '@mui/icons-material/StorefrontSharp';

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const userNameCookie = Cookies.get('userName');
    if (userNameCookie) {
      setUserName(userNameCookie);
    } else {
      alert('Token not found');
    }
  }, []);

  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  const handleLogout = async () => {
    try {
      const api = 'http://localhost:5000/user/logout';
      await axios.post(`${api}`);
      Cookies.remove('userName');
      setUserName('');
      toast.success('Logged out successfully');
    } catch (error) {
      console.log('Error while logging out', error);
      toast.error('Failed to logout');
    }
  };

  const handleHome = () => {
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body" fixed="top">
        <Container>
          <Navbar.Brand className="logo" onClick={handleHome}>
            LogoLO
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Form className="d-flex align-items-center search-form">
              <Form.Control
                type="search"
                placeholder="Search products..."
                className="me-2 search-input"
                aria-label="Search"
              />
              <Button variant="outline-success">
                <SearchIcon />
              </Button>
            </Form>
            <Nav className="ms-auto">
              <Nav.Link
                eventKey={2}
                href="#cart"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span className="me-2">
                  <ShoppingCartOutlinedIcon className="icon" />
                  Cart
                </span>
              </Nav.Link>
              <NavDropdown
                className="me-3 dropdown_class"
                title={<PersonRoundedIcon className="icon" />}
                id="collapsible-nav-dropdown"
                show={showDropdown}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <NavDropdown.Item href="#account">
                  <span>
                    <PersonRoundedIcon className="icon" />
                    My Account
                  </span>
                </NavDropdown.Item>
                <NavDropdown.Item href="#wishlist">
                  <span>
                    <FavoriteBorderOutlinedIcon className="icon" />
                    My Wishlist
                  </span>
                </NavDropdown.Item>
                <NavDropdown.Item href="#settings">
                  <span>
                    <TuneOutlinedIcon className="icon" />
                    Settings
                  </span>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  {userName ? (
                    <span onClick={handleLogout}>
                      <ExitToAppOutlinedIcon className="icon" />
                      Log out
                    </span>
                  ) : (
                    <span onClick={handleLogin}>
                      <LoginOutlinedIcon className="icon" />
                      Login
                    </span>
                  )}
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/seller/addproduct/12212">
              <StorefrontSharpIcon className='icon'/>
                <span className="me-2">Become Seller</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastContainer />
    </>
  );
}

export default Header;
