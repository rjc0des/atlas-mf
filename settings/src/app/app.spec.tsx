import { render } from '@testing-library/react';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should render all settings sections', () => {
    const { getByText } = render(<App />);
    expect(getByText('Appearance')).toBeTruthy();
    expect(getByText('Notifications')).toBeTruthy();
    expect(getByText('Environment thresholds')).toBeTruthy();
  });
});
