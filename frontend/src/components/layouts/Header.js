import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search';
import { Dropdown, Image } from 'react-bootstrap';
import { logout } from '../../actions/userActions';

export default function Header() {

  const { isAuthenticated, user } = useSelector(state => state.authState);
  const { items: cartItems } = useSelector(state => state.cartState)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout)
  }
  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
            <img width="150px" alt='JVLcart Logo' src="/images/logo.png" />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        {isAuthenticated ? (
          <Dropdown className='d-inline' variant="">
            <Dropdown.Toggle variant="default text-white pr-5" id="dropdown-basic">
              <figure className='avatar avatar-nav'>
                <Image width="50px" src={user.avatar ?? './images/default_avatar.png'} roundedCircle />
              </figure>
              <span>{user.name}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {user.role === "admin" && <Dropdown.Item onClick={() => navigate('/admin/dashboard')}  >Dashboard</Dropdown.Item>}

              <Dropdown.Item onClick={() => navigate('/myprofile')}  >Profile</Dropdown.Item>
              <Dropdown.Item onClick={() => navigate('/orders')}  >Orders</Dropdown.Item>
              <Dropdown.Item onClick={logoutHandler} className='text-danger' >Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )
          :
          <Link className="btn" to={"/login"} id="login_btn">Login</Link>
        }
        <Link id="cart" to='/cart' className="ml-3">Cart</Link>
        <span className="ml-1" id="cart_count">{cartItems.length}</span>
      </div>
    </nav>
  )
}