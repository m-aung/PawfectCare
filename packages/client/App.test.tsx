import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from './App';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      addListener: jest.fn(), // Mock addListener
    }),
  };
});

jest.mock('react-native-gesture-handler', () => {
  return {
    GestureHandlerRootView: ({ children }: { children: React.ReactNode }) => children,
    Swipeable: jest.fn(),
    DrawerLayout: jest.fn(),
  };
});

jest.mock('react-native-gesture-handler', () => {
  const GestureHandlerRootView = ({ children }: { children: React.ReactNode }) => children;
  return {
    GestureHandlerRootView,
    Swipeable: jest.fn(),
    DrawerLayout: jest.fn(),
    PanGestureHandler: jest.fn().mockImplementation(({ children }) => children),
    TapGestureHandler: jest.fn().mockImplementation(({ children }) => children),
    FlingGestureHandler: jest.fn().mockImplementation(({ children }) => children),
    LongPressGestureHandler: jest.fn().mockImplementation(({ children }) => children),
    NativeViewGestureHandler: jest.fn().mockImplementation(({ children }) => children),
    State: {},
    Directions: {},
  };
});


describe('App Navigation', () => {
  it('renders the AuthScreen by default', () => {
    const { getByText } = render(<App />);

    // Check if the AuthScreen is rendered
    expect(getByText('Login to PawfectCare')).toBeTruthy();
  });

  it('navigates to DashboardScreen after login', () => {
    const { getByText, getByPlaceholderText } = render(<App />);

    // Simulate entering email and password
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    // Simulate pressing the login button
    const loginButton = getByText('Login');
    fireEvent.press(loginButton);

    // Check if the DashboardScreen is rendered
    expect(getByText('Welcome to the Dashboard!')).toBeTruthy();
  });
});