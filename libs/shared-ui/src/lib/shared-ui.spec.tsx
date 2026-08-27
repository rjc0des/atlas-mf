import { render } from '@testing-library/react';

import AtlasMfSharedUi from './shared-ui';

describe('AtlasMfSharedUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AtlasMfSharedUi />);
    expect(baseElement).toBeTruthy();
  });
});
