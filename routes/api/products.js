const express = require("express");
const res = require("express/lib/response");
const { append } = require("express/lib/response");
const router = express.Router();

// product   model
const Products = require("../../models/products");
const products = require("../../models/products");

// save products
router.post("/api/products", (req, res) => {
  const newProduct = new Products(req.body);
  newProduct.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Product saved successfully",
    });
  });
  //  .then(item => res.json(item));
});
//get all
router.get("/api/products", (req, res) => {
  Products.find().exec((err, products) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    console.log("Products:", products); // Add console.log for products
    return res.status(200).json({
      success: true,
      existingProduct: products,
    });
  });
});

// get products

router.get("/api/products/:id", (req, res) => {
  let id = req.params.id;
  Products.findById(id, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      products,
    });
  });
});

//update product

router.put("/api/products/:id", (req, res) => {
  Products.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, products) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: "Updated Successfully",
      });
    }
  );
});

// delete product

router.delete("/api/products/:id", (req, res) => {
  Products.findByIdAndRemove(req.params.id).exec((err, deletedProduct) => {
    if (err)
      return res.status(400).json({
        message: "Delete Unsuccessfull",
        err,
      });

    return res.json({
      message: "Deleted Successfully",
      deletedProduct,
    });
  });
});

module.exports = router;
