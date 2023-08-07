import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Home from './home';

describe('<Home />', () => {
  test('Home mounts properly', () => {
    const wrapper = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );
    expect(wrapper).toBeTruthy();
  });
});
