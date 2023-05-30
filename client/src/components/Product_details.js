import React, { Component } from "react";
import axios from "axios";
// all product details 
export default class Product_details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.Products();
  }

  Products() {
    axios
      .get("http://localhost:8000/api/products")
      .then((response) => {
        //console.log("test", response.data.existingProduct);
        if (response.data.success) {
          this.setState({
            products: response.data.existingProduct,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  onDelete = (id) => {
    axios.delete(`http://localhost:8000/api/products/${id}`).then((res) => {
      alert("Delete Successfully");
      this.Product();
    });
  };

  render() {
    return (
      <div className="container">
        <h1 className="titlep">Product Details</h1>
        <br />
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map((product, index) => (
              <tr KEY={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <a
                    href={`/productList/${product._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {product.name}
                  </a>
                </td>
                <td>{product.description}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>
                  <a className="btn btn-light " href={`/edit/${product._id}`}>
                    <i className="fas fa-edit"></i>&nbsp;
                  </a>
                  &nbsp;
                  <a
                    className="btn btn-danger"
                    href="#"
                    onClick={() => this.onDelete(product._id)}
                  >
                    <i className="far fa-trash-alt"></i>&nbsp;
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-success">
          <a href="/add" style={{ textDecoration: "none", color: "white" }}>
            Add Product
          </a>
        </button>
      </div>
    );
  }
}
