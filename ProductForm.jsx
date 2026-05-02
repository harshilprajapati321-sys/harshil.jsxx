import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../store/actions/productActions';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const ProductForm = () => {
  const [product, setProduct] = useState({
    title: '',
    category: '',
    price: '',
    description: '',
    image: ''
  });
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState('');

  const { products } = useSelector(state => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      const existingProduct = products.find(p => p.id === parseInt(id));
      if (existingProduct) {
        setProduct(existingProduct);
      }
    }
  }, [id, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || '' : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!product.title || !product.category || !product.price || !product.description) {
      setError('All fields are required');
      return;
    }

    if (isEdit) {
      dispatch(updateProduct(parseInt(id), product));
    } else {
      dispatch(addProduct(product));
    }

    navigate('/products');
  };

  return (
    <Container className="form-wrapper">
      <div className="form-card">
        <h2 className="form-title">
          {isEdit ? ' Edit Product' : ' Add Product'}
        </h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <div className="grid">
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={product.title}
                onChange={handleChange}
                placeholder="Product title"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
                placeholder="Category"
              />
            </Form.Group>
          </div>

          <div className="grid">
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="₹ Price"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={product.image}
                onChange={handleChange}
                placeholder="Image link"
              />
            </Form.Group>
          </div>

          <Form.Group className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Write something..."
            />
          </Form.Group>

          <div className="btn-group-custom">
            <Button className="btn-main" type="submit">
              {isEdit ? 'Update' : 'Add'}
            </Button>

            <Button
              className="btn-cancel"
              onClick={() => navigate('/products')}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>

      
      <style>{`
        .form-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 90vh;
        }

        .form-card {
          width: 100%;
          max-width: 600px;
          padding: 30px;
          border-radius: 20px;
          background: linear-gradient(135deg, #f8f9fa, #e3f2fd);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transition: 0.3s;
        }

        .form-card:hover {
          transform: translateY(-5px);
        }

        .form-title {
          text-align: center;
          font-weight: bold;
          margin-bottom: 20px;
          color: #0d6efd;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 15px;
        }

        input, textarea {
          border-radius: 10px !important;
          border: 1px solid #ccc !important;
          transition: 0.2s;
        }

        input:focus, textarea:focus {
          border-color: #0d6efd !important;
          box-shadow: 0 0 5px rgba(13,110,253,0.4) !important;
        }

        .btn-group-custom {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }

        .btn-main {
          background: linear-gradient(135deg, #0d6efd, #6610f2);
          border: none;
          padding: 8px 20px;
          border-radius: 10px;
        }

        .btn-main:hover {
          opacity: 0.9;
        }

        .btn-cancel {
          background: #6c757d;
          border: none;
          border-radius: 10px;
          padding: 8px 20px;
        }

        @media(max-width: 576px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </Container>
  );
};

export default ProductForm;