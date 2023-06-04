import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductDetails from "./components/productDetails";
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
          <ProductList />
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
          render={(props) => <ProductDetails {...props} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
