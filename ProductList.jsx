import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, deleteProduct, searchProducts, filterByCategory, sortProducts } from '../store/actions/productActions';

const ProductList = () => {
  const { filteredProducts, loading, error, searchTerm, selectedCategory, sortBy } = useSelector(state => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearch = (e) => {
    dispatch(searchProducts(e.target.value));
  };

  const handleFilter = (e) => {
    dispatch(filterByCategory(e.target.value));
  };

  const handleSort = (e) => {
    dispatch(sortProducts(e.target.value));
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const categories = [...new Set(filteredProducts.map(p => p.category))];

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-5">Error: {error}</div>;
  }

  return (
    <>
     
      <style>
        {`
          body {
            margin: 0;
            font-family: Arial;
            background: linear-gradient(135deg, #1e3c72, #2a5298);
          }

          .wrapper {
            padding: 30px;
          }

          .title {
            text-align: center;
            color: white;
            margin-bottom: 30px;
          }

          .filter-box {
            background: white;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
          }

          .product-card {
            background: #fff;
            border-radius: 12px;
            padding: 15px;
            margin-bottom: 20px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            transition: 0.3s;
            position: relative;
          }

          .product-card:hover {
            transform: translateY(-5px);
          }

        
          .product-card img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 10px;
            margin-bottom: 10px;
          }

         
          .product-title {
            font-size: 18px;
            font-weight: bold;
            color: #333;
          }

         
          .price {
            color: #ff4b2b;
            font-weight: bold;
          }

         
          .btn-group {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
          }

          .btn-edit {
            background: #1e90ff;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
          }

          .btn-delete {
            background: #ff4b2b;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
          }

          .empty {
            background: white;
            padding: 20px;
            text-align: center;
            border-radius: 10px;
          }
        `}
      </style>

      <div className="wrapper">
        <h2 className="title">Product List</h2>

        
        <div className="row filter-box">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="col-md-4">
            <select className="form-select" value={selectedCategory} onChange={handleFilter}>
              <option value="">All Categories</option>
              {categories.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <select className="form-select" value={sortBy} onChange={handleSort}>
              <option value="id">Sort by ID</option>
              <option value="price-low-high">Low to High</option>
              <option value="price-high-low">High to Low</option>
            </select>
          </div>
        </div>

       
        {filteredProducts.length === 0 ? (
          <div className="empty">No Products Found</div>
        ) : (
          <div className="row">
            {filteredProducts.map((p) => (
              <div className="col-md-4" key={p.id}>
                <div className="product-card">
                  
                <img src={p.image} alt={p.name} />

                 
                  <div className="product-title">{p.name}</div>
                  <div>{p.category}</div>
                  <div className="price">₹ {p.price}</div>

                 
                  <div className="btn-group">
                    <button className="btn-edit" onClick={() => handleEdit(p.id)}>
                      Edit
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(p.id)}>
                      Delete
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList;