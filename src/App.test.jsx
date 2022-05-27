import { render } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  test('renders the calculator', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('calculator')).toBeTruthy();
  });

  test('applies global styles', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
