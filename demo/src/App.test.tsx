import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Note that this is case-insensitive/i);
  expect(linkElement).toBeInTheDocument();
});
