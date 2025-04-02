import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AuthScreen from './AuthScreen';
import { Alert } from 'react-native';

// Mock the Alert module
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

describe('AuthScreen', () => {
  it('renders the login screen correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <AuthScreen navigation={{ navigate: jest.fn() }} />
    );

    // Check if the title is rendered
    expect(getByText('Login to PawfectCare')).toBeTruthy();

    // Check if the input fields are rendered
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();

    // Check if the login button is rendered
    expect(getByText('Login')).toBeTruthy();
  });

  it('shows an error alert if email or password is empty', () => {
    const { getByText } = render(
      <AuthScreen navigation={{ navigate: jest.fn() }} />
    );

    // Simulate pressing the login button without entering email or password
    const loginButton = getByText('Login');
    fireEvent.press(loginButton);

    // Check if the Alert was called with the correct arguments
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Please enter both email and password.');
  });

  it('navigates to the Dashboard screen on successful login', () => {
    const mockNavigate = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <AuthScreen navigation={{ navigate: mockNavigate }} />
    );

    // Simulate entering email and password
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    // Simulate pressing the login button
    const loginButton = getByText('Login');
    fireEvent.press(loginButton);

    // Check if navigation to "Dashboard" was triggered
    expect(mockNavigate).toHaveBeenCalledWith('Dashboard');
  });
});