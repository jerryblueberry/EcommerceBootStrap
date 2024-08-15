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
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const userNameCookie = Cookies.get('userName');
    const userIdCookie = Cookies.get('userId');
    const userRoleCookie = Cookies.get('userRole');

    if (userNameCookie) {
      setUserName(userNameCookie);
    }

    if (userIdCookie) {
      setUserId(userIdCookie);
    }

    if (userRoleCookie) {
      setUserRole(userRoleCookie);
    }
  }, []);

  useEffect(() => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    
    setDebounceTimeout(
      setTimeout(async () => {
        if (searchQuery.trim()) {
          try {
            const response = await axios.get(`http://localhost:5000/product/search`, {
              params: { query: searchQuery }
            });
            setSearchResults(response.data);
          } catch (error) {
            console.error('Error fetching search results:', error);
          }
        } else {
          setSearchResults([]);
        }
      }, 200) // Debounce delay
    );
  }, [searchQuery]);

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
      Cookies.remove('userId');
      Cookies.remove('userRole');
      setUserName('');
      setUserId('');
      setUserRole('');
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

  const handleOrder = () => {
    navigate('/order')
  }
  const handleSearchNavigate =(sku) => {
    navigate(`/detail/${sku}`)
    window.location.reload();
  }

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
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline-success">
                <SearchIcon />
              </Button>
              {searchResults.length > 0 && (
                <div className="search-results">
                  {searchResults.map((product) => (
                    <>
                    <h6>Search Results</h6>
                    <div className="search-result-item" key={product._id} onClick={() =>handleSearchNavigate(product.sku)}>
                      <img src={`http://localhost:5000/${product.images[0]}`} alt={product.name} />
                      <div>
                        <p className="product-name">{product.name}</p>
                        <p className="product-price">${product.price}</p>
                      </div>
                    </div>

                    </>
                  
                  ))}
                </div>
              )}
            </Form>
            <Nav className="ms-auto">
              <Nav.Link
                eventKey={2}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span className="me-2" onClick={() => navigate('/cart')}>
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
                <NavDropdown.Item>
                  <span onClick={handleOrder}>
                    <PersonRoundedIcon className="icon" />
                    My Orders
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
              {userRole === 'user' ? (
                <Nav.Link href={`/seller/join-seller/${userId}`}>
                  <StorefrontSharpIcon className="icon" />
                  <span className="me-2">Become Seller</span>
                </Nav.Link>
              ) : userRole === 'seller' ? (
                <Nav.Link href={`/seller/add-store/${userId}`}>
                  <StorefrontSharpIcon className="icon" />
                  <span className="me-2">Store</span>
                </Nav.Link>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastContainer />
    </>
  );
}

export default Header;
