import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  // 1) rendering the component we want to test
  render(<App />);

  // 2) finding the elements
  const linkElement = screen.getByText(/learn react/i);

  // 3. we expect that this element is present in the document
  expect(linkElement).toBeInTheDocument();
});

// test("description", () => {

// })
