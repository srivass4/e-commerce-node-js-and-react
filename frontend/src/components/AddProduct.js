import React, { useState } from 'react';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setcategory] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState(false);

  const addProduct = async () => {
    console.warn(name)
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = fetch('http://localhost:5000/addProduct', {
      method: 'post',
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    //read readstream data into json format we use json() method
    result = await (await result).json();
    console.warn(result);
  }

  return (
    <div className='product'>
      <h1>Add Product</h1>
      <input type="text" name="name" id="" placeholder='Enter product name' className='inputBox' value={name} onChange={(e) => { setName(e.target.value) }} />
      {error && !name && <span className='invalid-input'>Enter valid name</span>}
      <input type="text" name="price" id="" placeholder='Enter product price' className='inputBox' value={price} onChange={(e) => { setPrice(e.target.value) }} />
      {error && !price && <span className='invalid-input'>Enter valid price</span>}
      <input type="text" name="category" id="" placeholder='Enter product category' className='inputBox' value={category} onChange={(e) => { setcategory(e.target.value) }} />
      {error && !category && <span className='invalid-input'>Enter valid category</span>}
      <input type="text" name="company" id="" placeholder='Enter product company' className='inputBox' value={company} onChange={(e) => { setCompany(e.target.value) }} />
      {error && !company && <span className='invalid-input'>Enter valid company</span>}
      <button type="button" className='appButton' onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default AddProduct;
