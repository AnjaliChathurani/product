import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Product_details from "./components/Product_details";
import CreateProduct from "./components/createProduct";
import EditProduct from "./components/editProduct";
import ProductList from "./components/productList";
import AppNavbar from "./components/AppNavbar";
function App() {
  return (
    <Router>
      <AppNavbar />
      <Switch>
        <Route path="/" exact>
          <Product_details />
        </Route>
        <Route path="/add" exact>
          <CreateProduct />
        </Route>
        <Route
          path="/edit/:id"
          render={(props) => <EditProduct {...props} />}
        />
        <Route
          path="/productList/:id"
          render={(props) => <ProductList {...props} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
