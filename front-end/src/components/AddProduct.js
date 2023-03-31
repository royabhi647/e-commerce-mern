import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const addProduct = async() => {
    console.log(!name);
    if(!name || !price || !category || !company){
        setError(true)
        return false;
    }
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    let result = await fetch('http://localhost:5000/add-product',{
        method:"post",
        body:JSON.stringify({name,price,category,company,userId}),
        headers:{
            "Content-Type":"application/json",
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    });
    result = await result.json()
    console.log(result);
    alert("Product added successfully")
  }
  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="Enter product name"
        className="inputBox"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />
      {error && !name && <spam className="invalid-input">Enter valid name</spam>}
      <input
        type="text"
        placeholder="Enter product price"
        className="inputBox"
        value={price}
        onChange={(e)=>setPrice(e.target.value)}
      />
      {error && !price && <spam className="invalid-input">Enter valid price</spam>}
      <input
        type="text"
        placeholder="Enter product category"
        className="inputBox"
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
      />
      {error && !category && <spam className="invalid-input">Enter valid category</spam>}
      <input
        type="text"
        placeholder="Enter product company"
        className="inputBox"
        value={company}
        onChange={(e)=>setCompany(e.target.value)}
      />
      {error && !company && <spam className="invalid-input">Enter valid company</spam>}
      <button onClick={addProduct} className="appButton">Add Product</button>
    </div>
  );
};

export default AddProduct;
