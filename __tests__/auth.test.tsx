// AuthComponent.test.tsx
import React from "react";
import { render, fireEvent, RenderAPI } from "@testing-library/react-native";
import Auth from "../components/Auth/login";
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store';
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { loginAction } from "../store/actions/auth";
jest.mock('/Users/pradoshnataraj/Desktop/ASE/wayfinding/store/actions/auth.ts', () => ({
  loginAction: jest.fn((login:any)=>{
    return {
        type: 'LOGIN',
        payload: login,
    };
  }
    )}
    ));
let mockStore = configureMockStore();
const store=mockStore( [])
describe("AuthComponent", () => {
  let wrapper: RenderAPI;

  it('should render email and password fields', () => {
    const { getByText, getByLabelText,getByPlaceholderText } = render(<Provider store={store}>   <GluestackUIProvider config={config}><Auth />   </GluestackUIProvider></Provider>);

    expect(getByPlaceholderText('Email')).toBeTruthy();
  /*   expect(getByLabelText('Email')).toBeTruthy(); // Assuming labels are used for email field
    expect(getByText('Password')).toBeTruthy();
    expect(getByLabelText('Password')).toBeTruthy(); // Assuming labels are used for password field */
  });

 /*  it('should update email state on change', () => {
    const { getByLabelText } = render(<Auth />);
    const emailInput = getByLabelText('Email');

    fireEvent.changeText(emailInput, 'test@example.com');

    expect(emailInput.value).toBe('test@example.com');
  });

  it('should update password state on change', () => {
    const { getByLabelText } = render(<Auth />);
    const passwordInput = getByLabelText('Password');

    fireEvent.changeText(passwordInput, 'password123');

    expect(passwordInput.value).toBe('password123');
  });

  it('should toggle password visibility', () => {
    const { getByText, queryByTestId } = render(<Auth />);
    const eyeIcon = queryByTestId('eye-icon'); // Assuming there's no specific test id

    expect(getByText('Password').type).toBe('password');

    fireEvent.press(eyeIcon);

    expect(getByText('Password').type).toBe('text');

    fireEvent.press(eyeIcon); // Toggle back

    expect(getByText('Password').type).toBe('password');
  });

  it('should dispatch login action on button press', () => {
    const { getByText } = render(<Auth />);
    const loginButton = getByText('Login');

    fireEvent.press(loginButton);

    expect(loginAction).toHaveBeenCalledTimes(1);
  });

  it('should dispatch login action with email and password from state', () => {
    const { getByText, getByLabelText } = render(<Auth />);
    const loginButton = getByText('Login');
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(loginButton);

    expect(loginAction).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  }); */
});