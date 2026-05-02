import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/authActions';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
     
      <style>
        {`
          .custom-navbar {
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(10px);
            padding: 12px 0;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          }

          .brand-text {
            font-size: 22px;
            font-weight: bold;
            background: linear-gradient(45deg, #00c6ff, #0072ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .nav-link {
            color: #fff !important;
            margin-right: 15px;
            transition: all 0.3s ease;
            position: relative;
          }

          .nav-link::after {
            content: '';
            position: absolute;
            width: 0%;
            height: 2px;
            background: #00c6ff;
            bottom: 0;
            left: 0;
            transition: 0.3s;
          }

          .nav-link:hover::after {
            width: 100%;
          }

          .nav-link:hover {
            color: #00c6ff !important;
          }

          .welcome-text {
            color: #ddd;
            margin-right: 15px;
          }

          .logout-btn {
            border-radius: 20px;
            padding: 5px 15px;
            transition: 0.3s;
          }

          .logout-btn:hover {
            background: #ff4d4d;
            border-color: #ff4d4d;
          }
        `}
      </style>

      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container">

         
          <Link className="navbar-brand brand-text" to="/">
            Product Manager
          </Link>

         
          <button
            className="navbar-toggler bg-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            ☰
          </button>

         
          <div className="collapse navbar-collapse" id="navbarNav">

            <ul className="navbar-nav me-auto">
              {isAuthenticated && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Dashboard
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/add-product">
                      Add Product
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <ul className="navbar-nav align-items-center">
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <span className="welcome-text">
                       {user?.username}
                    </span>
                  </li>

                  <li className="nav-item">
                    <button
                      className="btn btn-outline-light btn-sm logout-btn"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>

          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;