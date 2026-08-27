import { render } from '@testing-library/react';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should render the key ops stat cards', () => {
    const { getByText } = render(<App />);
    expect(getByText('99.97%')).toBeTruthy();
    expect(getByText('Environments managed')).toBeTruthy();
  });
});
