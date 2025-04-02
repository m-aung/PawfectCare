import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DashboardScreen from './DashboardScreen';

describe('DashboardScreen', () => {
  it('renders the dashboard screen correctly', () => {
    const { getByText } = render(<DashboardScreen navigation={{ navigate: jest.fn() }} />);

    // Check if the title is rendered
    expect(getByText('Welcome to the Dashboard!')).toBeTruthy();

    // Check if the subtitle is rendered
    expect(getByText('Manage your pet care services here.')).toBeTruthy();
  });

  it('navigates to the Auth screen on logout', () => {
    const mockNavigate = jest.fn();
    const { getByText } = render(<DashboardScreen navigation={{ navigate: mockNavigate }} />);

    // Simulate pressing the Logout button
    const logoutButton = getByText('Logout');
    fireEvent.press(logoutButton);

    // Check if navigation to "Auth" was triggered
    expect(mockNavigate).toHaveBeenCalledWith('Auth');
  });
});