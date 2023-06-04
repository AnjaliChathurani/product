import React from "react";
import { shallow } from "enzyme";
import axios from "axios";
import EditProduct from "./editProduct";
import request from "supertest";
import app from "./app";

// Rest of your test code...

jest.mock("axios");

describe("EditProduct Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<EditProduct match={{ params: { id: "123" } }} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update state when input values change", () => {
    const nameInput = wrapper.find('input[name="name"]');
    const descriptionInput = wrapper.find('input[name="description"]');
    const quantityInput = wrapper.find('input[name="quantity"]');
    const priceInput = wrapper.find('input[name="price"]');
    const categoryInput = wrapper.find('input[name="category"]');

    nameInput.simulate("change", {
      target: { name: "name", value: "Test Name" },
    });
    descriptionInput.simulate("change", {
      target: { name: "description", value: "Test Description" },
    });
    quantityInput.simulate("change", {
      target: { name: "quantity", value: "10" },
    });
    priceInput.simulate("change", {
      target: { name: "price", value: "99.99" },
    });
    categoryInput.simulate("change", {
      target: { name: "category", value: "Test Category" },
    });

    expect(wrapper.state().name).toEqual("Test Name");
    expect(wrapper.state().description).toEqual("Test Description");
    expect(wrapper.state().quantity).toEqual("10");
    expect(wrapper.state().price).toEqual("99.99");
    expect(wrapper.state().category).toEqual("Test Category");
  });

  it("should make a PUT request when form is submitted", async () => {
    const mockResponse = { data: { success: true } };
    axios.put.mockResolvedValue(mockResponse);
    const preventDefault = jest.fn();

    wrapper.find("form").simulate("submit", { preventDefault });

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenCalledWith(
      "http://localhost:8000/api/products/123",
      {
        name: "",
        description: "",
        quantity: "",
        price: "",
        category: "",
      }
    );
    await expect(axios.put).toHaveReturnedWith(mockResponse);
    expect(wrapper.state()).toEqual({
      name: "",
      description: "",
      quantity: "",
      price: "",
      category: "",
    });
  });

  it("should fetch product details on mount and populate state", async () => {
    const mockResponse = {
      data: {
        success: true,
        products: {
          name: "Test Name",
          description: "Test Description",
          quantity: "10",
          price: "99.99",
          category: "Test Category",
        },
      },
    };
    axios.get.mockResolvedValue(mockResponse);

    await wrapper.instance().componentDidMount();

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:8000/api/products/123"
    );
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(wrapper.state()).toEqual({
      name: "Test Name",
      description: "Test Description",
      quantity: "10",
      price: "99.99",
      category: "Test Category",
    });
  });
});
