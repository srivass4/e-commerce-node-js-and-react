import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdataProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setcategory] = useState('');
  const [company, setCompany] = useState('');
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    console.warn(params);
    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
      //send token to other api
      headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
  });
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setcategory(result.category);
    setCompany(result.company);
  }

  const updateProduct = async () => {
    console.warn(name, price, category, company);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    //convert read stream into json format
    result = await result.json();
    console.warn(result);
    navigate('/');





  }

  return (
    <div className='product'>
      <h1>Update Product</h1>
      <input type="text" name="name" id="" placeholder='Enter product name' className='inputBox' value={name} onChange={(e) => { setName(e.target.value) }} />
      <input type="text" name="price" id="" placeholder='Enter product price' className='inputBox' value={price} onChange={(e) => { setPrice(e.target.value) }} />
      <input type="text" name="category" id="" placeholder='Enter product category' className='inputBox' value={category} onChange={(e) => { setcategory(e.target.value) }} />
      <input type="text" name="company" id="" placeholder='Enter product company' className='inputBox' value={company} onChange={(e) => { setCompany(e.target.value) }} />
      <button type="button" className='appButton' onClick={updateProduct}>Update Product</button>
    </div>
  );
}

export default UpdataProduct;
