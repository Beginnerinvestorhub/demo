/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Basic Test Suite', () => {
  it('should run a basic test', () => {
    expect(true).toBe(true);
  });

  it('should render without crashing', () => {
    const { getByTestId } = render(<div data-testid="test-element">Test</div>);
    expect(getByTestId('test-element')).toBeInTheDocument();
  });
});
