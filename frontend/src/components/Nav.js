import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/signup');
  }

  return (
    <div>
      <img src="https://th.bing.com/th/id/OIP.yKOc__wAqqzS5EYi6Psz4gHaHa?rs=1&pid=ImgDetMain" alt="" srcset="" className='logo'/>
      {auth ? <ul className='nav-ul'>
        <li><Link to="/">Products</Link></li>
        <li><Link to="/add">Add Product</Link></li>
        <li><Link to="/update">Update Product</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/signup" onClick={logout}>Logout ({JSON.parse(auth).name})</Link></li>
        {/* <li>{ auth ?<Link to="/signup" onClick={logout}>Logout</Link>:<Link to="/signup">Sign Up</Link>}</li>
        <li><Link to="/login">Login</Link></li> */}
      </ul> :
        <ul className='nav-ul nav-right'>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      }
    </div>
  );
}

export default Nav;
