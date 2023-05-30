import React, { Component } from "react";

import axios from "axios";
import "./productList.css";

export default class productList extends Component {
  constructor(props) {
    super(props);
    this.state = { product: {} };
  }

  componentDidMount() {
    console.log("param", this.props.match.params.id);
    const id = this.props.match.params.id;
    axios
      .get(`http://localhost:8000/api/products/${id}`)
      .then((response) => {
        console.log("test2", response.data);
        if (response.data.success) {
          this.setState({
            product: response.data.products,
          });
          console.log(this.state.product);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { name, description, quantity, price, category } = this.state.product;
    return (
      <div className="containerx">
        <div className="card card-custom-wide">
          <h3 className="titled">{name}</h3>
          <hr />
          <div className="card-body">
            <dl className="row">
              <dt className="col-sm-3">Description</dt>
              <dd className="col-sm-9">{description}</dd>
              <dt className="col-sm-3">Quantity</dt>
              <dd className="col-sm-9">{quantity}</dd>
              <dt className="col-sm-3">price</dt>
              <dd className="col-sm-9">{price}</dd>
              <dt className="col-sm-3">Category </dt>
              <dd className="col-sm-9">{category}</dd>
            </dl>
          </div>
        </div>
      </div>
    );
  }
}
