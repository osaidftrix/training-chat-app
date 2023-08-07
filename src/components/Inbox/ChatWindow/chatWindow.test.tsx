import { describe, test, expect } from 'vitest';
import { Provider } from 'react-redux';
import { create } from 'react-test-renderer';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../../../store';
import ChatWindow from './chatWindow';

describe('<ChatWindow />', () => {
  test('ChatWindow mounts properly', () => {
    const renderer = create(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ChatWindow toggledUser={'testuser'} setToggledUser={() => {}} />
        </PersistGate>
      </Provider>,
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
