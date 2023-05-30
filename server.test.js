const { expect } = require('chai');
const request = require('supertest');
const express = require('express');
const router = require('../mernstack/routes/api/products'); // Replace with the actual path to your router file

const app = express();
app.use('/', router);

describe('Product API', () => {
  // Test POST /api/products
  it('should save a new product', (done) => {
    const newProduct = {
      // Provide the necessary data for the new product
    };

    request(app)
      .post('/api/products')
      .send(newProduct)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.have.property('success', 'Product saved successfully');
        done();
      });
  });

  // Test GET /api/products
  it('should retrieve all products', (done) => {
    request(app)
      .get('/api/products')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.have.property('success', true);
        expect(res.body).to.have.property('existingProduct').that.is.an('array');
        done();
      });
  });

  // Test GET /api/products/:id
  it('should retrieve a specific product', (done) => {
    const productId = 'your-product-id'; // Replace with an existing product ID

    request(app)
      .get(`/api/products/${productId}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.have.property('success', true);
        expect(res.body).to.have.property('products').that.is.an('object');
        done();
      });
  });

  // Test PUT /api/products/:id
  it('should update a specific product', (done) => {
    const productId = 'your-product-id'; // Replace with an existing product ID
    const updatedProduct = {
      // Provide the necessary data for updating the product
    };

    request(app)
      .put(`/api/products/${productId}`)
      .send(updatedProduct)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.have.property('success', 'Updated Successfully');
        done();
      });
  });

  // Test DELETE /api/products/:id
  it('should delete a specific product', (done) => {
    const productId = 'your-product-id'; // Replace with an existing product ID

    request(app)
      .delete(`/api/products/${productId}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.have.property('message', 'Deleted Successfully');
        expect(res.body).to.have.property('deletedProduct').that.is.an('object');
        done();
      });
  });
});
