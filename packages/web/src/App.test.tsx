import { describe, it, expect,  } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders the Vite and React logos', () => {
    render(<App />);

    // Check if the Vite logo is rendered
    const viteLogo = screen.getByAltText('Vite logo');
    expect(viteLogo).toBeInTheDocument();

    // Check if the React logo is rendered
    const reactLogo = screen.getByAltText('React logo');
    expect(reactLogo).toBeInTheDocument();
  });

  it('renders the heading and initial content', () => {
    render(<App />);

    // Check if the heading is rendered
    const heading = screen.getByText('Vite + React');
    expect(heading).toBeInTheDocument();

    // Check if the initial button text is rendered
    const button = screen.getByRole('button', { name: /count is 0/i });
    expect(button).toBeInTheDocument();

    // Check if the instructional text is rendered
    const editText = screen.getByText(/Edit/i);
    const srcText = screen.getByText(/src\/App.tsx/i);
    const instructions = screen.getByText(/and save to test HMR/i);
    expect(editText).toBeInTheDocument();
    expect(srcText).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
  });

  it('increments the count when the button is clicked', () => {
    render(<App />);

    // Get the button
    const button = screen.getByRole('button', { name: /count is 0/i });

    // Simulate a button click
    fireEvent.click(button);

    // Check if the count is incremented
    expect(button).toHaveTextContent('count is 1');

    // Simulate another button click
    fireEvent.click(button);

    // Check if the count is incremented again
    expect(button).toHaveTextContent('count is 2');
  });
});