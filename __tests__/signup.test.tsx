import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Signup from "../components/Auth/Signup";
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store';
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { registerAction } from "../store/actions/auth";
jest.mock('../../store/actions/auth.ts', () => ({
  registerAction: jest.fn((signupData:any) => {
    return {
      type: 'REGISTER',
      payload: signupData,
    };
  }),
  getToken: jest.fn()
}));
let mockStore = configureMockStore();
const store = mockStore([]);

describe("SignupComponent", () => {
  let any;

  beforeEach(() => {
    wrapper = render(
      <Provider store={store}>
        <GluestackUIProvider config={config}>
          <Signup />
        </GluestackUIProvider>
      </Provider>
    );
  });

  it('should render username, email, and password fields', () => {
    const { getByPlaceholderText, getByTestId } = wrapper;

    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByTestId('password')).toBeTruthy();
  });

  it('should allow entering username, email, and password', () => {
    const { getByPlaceholderText, getByTestId } = wrapper;
    const usernameInput = getByPlaceholderText('Name');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByTestId('password');

    fireEvent.changeText(usernameInput, 'testUser');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'testPassword');

    expect(usernameInput.props.value).toBe('testUser');
    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('testPassword');
  });

  // Add additional tests for button presses, form submission, etc.
});
