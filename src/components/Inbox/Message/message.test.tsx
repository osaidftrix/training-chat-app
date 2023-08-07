import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import Message from './message';

describe('<Message />', () => {
  test('Message mounts properly', () => {
    const { container } = render(
      <Provider store={store}>
        <Message message={''} username={''} />{' '}
      </Provider>,
    );
    expect(container).toBeTruthy();
  });

  test('Renders username tag', () => {
    const { container } = render(
      <Provider store={store}>
        <Message message={'test message'} username={'-11'} />{' '}
      </Provider>,
    );
    expect(container.getElementsByClassName('self')).toBeTruthy();
  });

  test('Does not render username tag', () => {
    const { container } = render(
      <Provider store={store}>
        <Message message={'test message'} username={''} />{' '}
      </Provider>,
    );
    expect(container.getElementsByClassName('self')).toBeTruthy();
  });

  test('Renders text message content', () => {
    render(
      <Provider store={store}>
        <Message message={'test message'} username={'testusername'} />{' '}
      </Provider>,
    );
    const text = screen.getByText(/test message/i);
    expect(text.textContent).toBeTruthy();
  });
});
