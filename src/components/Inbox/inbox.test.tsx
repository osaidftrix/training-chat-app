import { describe, test, expect } from 'vitest';
import Inbox from './inbox';
import { Provider } from 'react-redux';
import { create } from 'react-test-renderer';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../../store';

describe('<Inbox />', () => {
  test('Inbox mounts properly', () => {
    const renderer = create(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Inbox />
        </PersistGate>
      </Provider>,
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
