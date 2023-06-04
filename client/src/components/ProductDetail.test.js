import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import ProductDetails from "./Product_details";

jest.mock("axios"); // Mock axios for testing

describe("ProductDetails component", () => {
  test("renders product details", async () => {
    const mockProducts = [
      {
        _id: "1",
        name: "shoes",
        description: "suitable for normal function",
        quantity: 14,
        price: 1000,
        category: "ladies",
      },
      
    ];
    console.log(mockProducts);

    axios.get.mockResolvedValueOnce({
      data: { existingProduct: mockProducts },
    });

    render(<ProductDetails />);

    // Wait for the axios request to be resolved and component to re-render
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    // Assert that product details are rendered
    expect(screen.getByText("shoes")).toBeInTheDocument();
    expect(screen.getByText("suitable for normal function")).toBeInTheDocument();
    expect(screen.getByText("14")).toBeInTheDocument();
    expect(screen.getByText("1000")).toBeInTheDocument();
    expect(screen.getByText("ladies")).toBeInTheDocument();
  });

  test("deletes product on button click", async () => {
    const mockProducts = [
      {
        _id: "1",
        name: "shoes",
        description: "suitable for normal function",
        quantity: 14,
        price: 1000,
        category: "ladies",
      },
    ];

    axios.get.mockResolvedValueOnce({
      data: { existingProduct: mockProducts },
    });
    axios.delete.mockResolvedValueOnce({});

    render(<ProductDetails />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    // Simulate a delete button click
    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);

    // Wait for the axios delete request to be resolved
    await waitFor(() => expect(axios.delete).toHaveBeenCalledTimes(1));

    // Assert that the delete success message is shown
    expect(screen.getByText("Delete Successfully")).toBeInTheDocument();
  });
});
