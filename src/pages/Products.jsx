import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.article.toLowerCase().includes(searchTerm.toLowerCase())
  );


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 1);
    return () => clearInterval(intervalId);
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:5000/products/${selectedProduct.id}`, selectedProduct);
      setShowModal(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/products/${productId}`);
        setProducts(products.filter((product) => product.id !== productId));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <header>
        <nav className='nav2'>
          <h3>Товары</h3>
          <p>Главная / Товары</p>
        </nav>
      </header>
      <main>
        <div className="allProducts">
          <div className="all-top">
            <h3>Все товары ({products.length})</h3>
            <input onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder='Поиск'/>
          </div>
          <hr />
          <table className='table'>
            <thead>
              <tr className='text-uppercase'>
                <th>Наименование</th>
                <th>Артикул</th>
                <th>Бренд</th>
                <th>Цена</th>
                <th>Цена со скидкой</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {
              filteredProducts.map((product, index) => (
                <tr key={index}>
                  <td>{product.title}</td>
                  <td>{product.article}</td>
                  <td>{product.brand}</td>
                  <td>{product.price}</td>
                  <td>{product.disCount}</td>
                  <td>
                    <div className='d-flex gap-3'>
                      <img onClick={() => handleEdit(product)} src="../public/Button Edit.svg" alt="" />
                      <img onClick={() => handleDelete(product.id)} src="../public/Button Trash.svg" alt="" />
                    </div>
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>
        <Link to='/products'>
          <button className='btn-tovar'>Новый товар</button>
        </Link>
      </main>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Наименование:</label>
            <input type="text" className="form-control" id="title" value={selectedProduct ? selectedProduct.title : ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, title: e.target.value })} />
          </div>
          <div className="mb-3">
            <label htmlFor="article" className="form-label">Артикул:</label>
            <input type="text" className="form-control" id="article" value={selectedProduct ? selectedProduct.article : ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, article: e.target.value })} />
          </div>
          <div className="mb-3">
            <label htmlFor="brand" className="form-label">Бренд:</label>
            <input type="text" className="form-control" id="brand" value={selectedProduct ? selectedProduct.brand : ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, brand: e.target.value })} />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Цена:</label>
            <input type="text" className="form-control" id="price" value={selectedProduct ? selectedProduct.price : ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })} />
          </div>
          <div className="mb-3">
            <label htmlFor="disCount" className="form-label">Цена со скидкой:</label>
            <input type="text" className="form-control" id="disCount" value={selectedProduct ? selectedProduct.disCount : ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, disCount: e.target.value })} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Products;
