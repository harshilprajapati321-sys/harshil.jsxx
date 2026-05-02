import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, checkAuth } from '../store/actions/authActions';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',                               
    password: ''
  });
  const [error, setError] = useState('');

  const { loading, error: authError, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkAuth());
    if (isAuthenticated) {
      navigate('/products');
    }
  }, [dispatch, isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password');
      return;
    }

    dispatch(login(credentials.username, credentials.password));
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <>
     
      <style>{`
        body {
          background: linear-gradient(135deg, #667eea, #764ba2);
        }

        .login-container {
          margin-top: 80px;
        }

        .login-card {
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          overflow: hidden;
          animation: fadeIn 0.8s ease-in-out;
        }

        .login-header {
          background: linear-gradient(135deg, #4facfe, #00f2fe);
          color: white;
          padding: 15px;
          text-align: center;
        }

        .form-control {
          border-radius: 10px;
          transition: 0.3s;
        }

        .form-control:focus {
          border-color: #4facfe;
          box-shadow: 0 0 8px rgba(79,172,254,0.5);
        }

        .login-btn {
          border-radius: 25px;
          background: linear-gradient(135deg, #43e97b, #38f9d7);
          border: none;
          font-weight: bold;
          transition: 0.3s;
        }

        .login-btn:hover {
          transform: scale(1.05);
          background: linear-gradient(135deg, #38f9d7, #43e97b);
        }

        .demo-text {
          font-size: 13px;
          color: #666;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <Container className="login-container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card login-card">
              
              <div className="login-header">
                <h3>Login</h3>
              </div>

              <div className="card-body">
                {(error || authError) && (
                  <Alert variant="danger">
                    {error || authError}
                  </Alert>
                )}
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={credentials.username}
                      onChange={handleChange}
                      placeholder="Enter username"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      required
                    />
                  </Form.Group>

                  <Button 
                    type="submit" 
                    className="w-100 login-btn"
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                </Form>

                <div className="mt-3 text-center">
                  <small className="demo-text">
                    Demo: username: prajapati | password: harshil18
                  </small>
                </div>

              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;