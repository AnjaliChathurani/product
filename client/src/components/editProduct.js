import React, { Component } from "react";
import axios from "axios";
import "./create.css";
import { withRouter } from "react-router-dom";

class editProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      quantity: "",
      price: "",
      category: "",
      errors: {},
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const id = this.props.match.params.id;
    const { name, description, quantity, price, category } = this.state;
    const errors = {};

    // Perform validation
    if (!name) {
      errors.name = "Please enter a name";
    }

    if (!description) {
      errors.description = "Please enter a description";
    }

    if (!quantity || isNaN(quantity) || quantity <= 0) {
      errors.quantity = "Please enter a valid quantity";
    }

    if (!price || isNaN(price) || price <= 0) {
      errors.price = "Please enter a valid price";
    }

    if (!category) {
      errors.category = "Please select a category";
    }

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }
    const data = {
      name: this.state.name,
      description: this.state.description,
      quantity: this.state.quantity,
      price: this.state.price,
      category: this.state.category,
    };

    axios.put(`http://localhost:8000/api/products/${id}`, data).then((res) => {
      if (res.data.success) {
        alert("Post Updated Successfully");
        this.setState({
          name: "",
          description: "",
          quantity: "",
          price: "",
          category: "",
        });
        console.log("posted data", this.state);
      }
      this.props.history.push("/");
    });
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(`http://localhost:8000/api/products/${id}`)
      .then((response) => {
        console.log("test", response.data.products);
        if (response.data.success) {
          this.setState({
            name: response.data.products.name,
            description: response.data.products.description,
            quantity: response.data.products.quantity,
            price: response.data.products.price,
            category: response.data.products.category,
          });
          console.log("update", response.data.products.name);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <h1 className="title">Edit Product</h1>
        <form className="needs-validation" noValidate>
          <div className="form-group">
            <label className="label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter name"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              className="form-control"
              name="description"
              placeholder="Enter description"
              value={this.state.description}
              onChange={this.handleInputChange}
            />
            {errors.description && (
              <div className="text-danger">{errors.description}</div>
            )}
          </div>
          <div className="form-group">
            <label className="label">Quantity</label>
            <input
              type="text"
              className="form-control"
              name="quantity"
              placeholder="Enter quantity"
              value={this.state.quantity}
              onChange={this.handleInputChange}
            />
            {errors.quantity && (
              <div className="text-danger">{errors.quantity}</div>
            )}
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="text"
              className="form-control"
              name="price"
              placeholder="Enter price"
              value={this.state.price}
              onChange={this.handleInputChange}
            />
            {errors.price && <div className="text-danger">{errors.price}</div>}
          </div>
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              className="form-control"
              name="category"
              placeholder="Enter category"
              value={this.state.category}
              onChange={this.handleInputChange}
            />
            {errors.category && (
              <div className="text-danger">{errors.category}</div>
            )}
          </div>
          <br />
          <button
            className="button buttonBlue"
            type="submit"
            onClick={this.onSubmit}
          >
            &nbsp;Update
          </button>
        </form>
      </div>
    );
  }
}
export default withRouter(editProduct);
