import { render } from '@testing-library/react';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should render the three incident/deploy columns', () => {
    const { getByText } = render(<App />);
    expect(getByText('Investigating')).toBeTruthy();
    expect(getByText('Mitigating')).toBeTruthy();
    expect(getByText('Resolved')).toBeTruthy();
  });
});
