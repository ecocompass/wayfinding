// AuthComponent.test.tsx
import React from "react";
import { render, fireEvent, RenderAPI } from "@testing-library/react-native";
import Auth from "../components/Auth/login";

describe("AuthComponent", () => {
  let wrapper: RenderAPI;
  it("renders correctly", () => {
    const { getByTestId } = render(<Auth />);
    const button = getByTestId("auth-button");
    expect(button).toBeDefined();
  });

  it("email and password input check", () => {
    const emailInput = wrapper.getByTestId("email");
    fireEvent.changeText(emailInput, "geto@tcd.ie");
    expect(wrapper.getAllByDisplayValue("geto@tcd.ie")).toHaveLength(1);

    const passwordInput = wrapper.getByTestId("password");
    fireEvent.changeText(passwordInput, "Password123");
    expect(wrapper.getAllByDisplayValue("Password123")).toHaveLength(1);
  });

  it("should submit the form with username, password", async () => {
    const username = wrapper.getByTestId("email");
    const password = wrapper.getByTestId("password");
    const submit = wrapper.getByTestId("Login");

    fireEvent.changeText(username, "geto@tcd.ie");
    fireEvent.changeText(password, "wrongpassword");
    fireEvent.press(submit);
  });
});
