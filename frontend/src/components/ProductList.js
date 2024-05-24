import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

const ProductList = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/getProducts', {
            //send token to other api
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
        );
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete",
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    }

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`, {
                //send token to other api
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        }
        else {
            getProducts();
        }
    }

    return (
        <div className='product-list'>
            <h1>Product List</h1>
            <input type="text" name="" id="" placeholder='Search Product' className='search-product-box'
                onChange={searchHandle}
            />
            <ul>
                <li>S. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                products.length > 0 ? products.map((product, index) => (
                    <ul key={product._id}>
                        <li>{index + 1}</li>
                        <li>{product.name}</li>
                        <li>$ {product.price}</li>
                        <li>{product.category}</li>
                        <li>{product.company}</li>
                        <li>
                            <button type="button" onClick={() => deleteProduct(product._id)}>Delete</button>
                            <Link to={"/update/" + product._id}>Update</Link>
                        </li>
                    </ul>
                )) : <h1>No Product Found</h1>
            }
        </div>
    );
}

export default ProductList;
