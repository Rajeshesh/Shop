import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search';
import { logout } from '../../actions/userActions';
import { AppBar, Avatar, Badge, Menu, MenuItem, Typography } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import Switch from '@mui/material/Switch';

export default function Header() {
  const { isAuthenticated, user } = useSelector(state => state.authState);
  const { items: cartItems } = useSelector(state => state.cartState)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)

  const logoutHandler = () => {
    dispatch(logout)
  }

  return (
    <AppBar position='sticky' >
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.3% 1.5%'
      }} >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography variant='h4' color='secondary' component='p' >Shop</Typography>
        </Link>

        <Box sx={{ display: { xs: 'none', sm: 'block' }, maxWidth: '700px', flexGrow: 1 }}>
          <Search />
        </Box>



        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {isAuthenticated ? (
            <div>
              <Avatar onClick={() => setOpen(true)} src={user.avatar ?? './images/default_avatar.png'} />
              <Menu
                open={open}
                onClose={e => setOpen(false)}
                onClick={() => setOpen(false)}
                anchorOrigin={{
                  vertical: "10",
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: " 50",
                  horizontal: 'right'
                }}>
                <MenuItem ><Switch /></MenuItem>
                {user.role === "admin" && <MenuItem onClick={() => navigate('/admin/dashboard')}  >Dashboard</MenuItem>}
                <MenuItem onClick={() => navigate('/myprofile')}>Profile</MenuItem>
                <MenuItem onClick={() => navigate('/orders')}>Orders</MenuItem>
                <MenuItem onClick={logoutHandler} >Logout</MenuItem>
              </Menu>
            </div>
          ) :
          <Button variant='contained' color='secondary'>
            <Link  to={"/login"} >Login</Link>
          </Button>
          }
          <Link  to='/cart' className="ml-3 ">
            <Badge badgeContent={cartItems.length} color='secondary'><ShoppingCart  color='warning' /></Badge>
          </Link>
        </div>
      </Box>
      <Box sx={{ display: { xs: 'flex', sm: 'none' }, justifyContent: 'center', paddingBottom: '1%' }}>
        <Search  />
      </Box>

    </AppBar>
  )
}