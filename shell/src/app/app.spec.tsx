import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render the Pulse header and nav', () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(getByText('Pulse')).toBeTruthy();
    expect(getByText('Boards')).toBeTruthy();
    expect(getByText('Reports')).toBeTruthy();
    expect(getByText('Settings')).toBeTruthy();
  });
});
