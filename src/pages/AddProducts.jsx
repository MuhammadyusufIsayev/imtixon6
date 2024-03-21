import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AddProducts = () => {
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [article, setArticle] = useState('');
  const [price, setPrice] = useState(0);
  const [disCount, setDisCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!title || !brand || !article || !price) {
      alert('All fields are required');
      return;
    }

    const discountValue = disCount === '' ? 0 : disCount;

  
    const data = {
      title,
      brand,
      article,
      price,
      disCount: discountValue 
    };
  
    try {
      await axios.post('http://localhost:5000/products', data);
      console.log('Product added successfully');
      setTitle('');
      setBrand('');
      setArticle('');
      setPrice(0);
      setDisCount(0);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  
  
  return (
    <div>
      <header>
        <nav className='nav2'>
          <h3>Новый товар</h3>
          <p>Главная / Товары / Новый товар</p>
        </nav>
      </header>
      <main>
        <div className='allProducts'>
          <form onSubmit={handleSubmit}>
            <div className='top'>
              <div>
                <label>Название</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
            </div>
            <div className='center'>
              <div>
                <label>
                  Бренд
                </label>
                <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
              </div>
              <div>
                <label>
                  Артикул производителя *
                </label>
                <input type="number" value={article} onChange={(e) => setArticle(e.target.value)} />
              </div>
            </div>
            <div className='bottom'>
              <div>
                <label>
                  Цена
                </label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div>
                <label>
                  Цена со скидкой
                </label>
                <input type="number" value={disCount} onChange={(e) => setDisCount(e.target.value)} />
              </div>
            </div>
              <button type="submit" className='btn-tovar'>Сохранить</button>
          </form>
        </div>
        <Link to='/'>
          <button className='btn-tovar'>Отмена</button>
        </Link>
      </main>
    </div>
  );
};

export default AddProducts;
