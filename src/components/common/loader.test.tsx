import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import Loader from './loader';

describe('<Loader />', () => {
  test('Message mounts properly', () => {
    const { container } = render(<Loader />);
    expect(container).toBeTruthy();
  });
});
