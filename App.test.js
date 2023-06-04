import { render, screen } from "@testing-library/react";
import App from "./App.js";
import supertest from "supertest";
import { response } from "express";

describe("POST/api/products", () => {
  test("should respond with a 200 status code", () => {
    const respond = request(app).post("/api/products").send({
      name: "name",
      description: "description",
      quantity: "quantity",
      price: "price",
      category: "category",
    });
    expect(response.statusCode).toBe(200);
  });
  describe("given a name,description,quantity,price and category", () => {});
});
