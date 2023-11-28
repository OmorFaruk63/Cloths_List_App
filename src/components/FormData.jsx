import { useEffect, useState } from "react";

import ClothRow from "./ClothRow";

import "./FormData.css";

const FromData = () => {
  //Get Data From LocalStorage
  function getData() {
    const jsonData = localStorage.getItem("product");
    if (jsonData) {
      return JSON.parse(jsonData);
    } else {
      return [];
    }
  }

  const [Product, setProduct] = useState(getData());

  const elementsObj = {};
  //  Product Submit
  function handleSubmit(e) {
    e.preventDefault();

    //Collecting product id for unique id
    const ary = [];
    Product.map((item) => {
      ary.push(item.clothId);
    });

    const elements = [...e.target.elements];
    elements.map((element) => {
      //Checking input fild is Emty
      if (element.value !== "") {
        elementsObj[element.name] = element.value;
      }
      element.value = "";
    });

    //checking product Id
    if (!ary.includes(elementsObj.clothId)) {
      setProduct([...Product, elementsObj]);
    } else {
      alert("Same Id");
    }
    console.log(elementsObj);
  }

  // Add Product List LocalStorage
  useEffect(() => {
    localStorage.setItem("product", JSON.stringify(Product));
  }, [Product]);

  // Delete Product List
  function edite(id) {
    const filterProduct = Product.filter((product) => {
      return product.clothId !== id;
    });
    setProduct(filterProduct);
  }

  return (
    <div className="container">
      <div>
        {/*-----------------------------Form---------------------  */}
        <form onSubmit={handleSubmit}>
          <label htmlFor=""> Cloth Name:</label>
          <input
            value={elementsObj.clothName}
            autoFocus
            type="text"
            name="clothName"
            required
            maxLength="20"
          />
          <br />
          <label htmlFor="">Cloth Id:</label>
          <input
            required
            value={elementsObj.clothId}
            type="number"
            name="clothId"
            max="100000"
          />
          <br />
          Price:
          <input
            required
            value={elementsObj.price}
            type="number"
            max="9999"
            name="price"
          />
          <br />
          Quantity:
          <input
            required
            value={elementsObj.quantity}
            type="number"
            name="quantity"
            max="4"
          />
          <br />
          Description:
          <br />
          <textarea
            maxLength="30"
            name="description"
            id=""
            cols="15"
            rows="2"
          ></textarea>
          <br />
          Choose a Color:
          <br />
          <select required name="color">
            <option value="">Choose Color</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
          </select>
          <br />
          <br />
          <label htmlFor="">Trams And Condition</label>
          <input required type="checkbox" name="checkbox" id="" />
          <br />
          <br />
          <input required type="date" name="date" id="" />
          <br />
          <br />
          <label htmlFor="">Size:</label>
          <input required type="radio" name="size" value="M" id="m" />
          <label htmlFor="m">M</label>&nbsp;&nbsp;
          <input required type="radio" name="size" value="L" id="l" />
          <label htmlFor="l">L</label>&nbsp;&nbsp;
          <input required type="radio" name="size" value="XL" id="xl" />
          <label htmlFor="xl">XL</label>&nbsp;&nbsp;
          <br />
          <br />
          <input type="submit" value="submit" />
          <br />
        </form>
      </div>

      <div></div>
      {/*--------------------------  Table---------------------  */}

      {Product.length < 1 ? (
        <h1>No Product Added</h1>
      ) : (
        <table>
          <tbody>
            <tr>
              <th>Cloth Name:</th>
              <th>Cloth Id</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Color</th>
              <th>Description</th>
              <th>Date</th>
              <th>Size</th>
              <th>Delete</th>
            </tr>
            {/*--------------------------  Table Raw---------------------  */}
            {Product.map((item) => (
              <ClothRow key={item.clothId} item={item} edite={edite} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FromData;
