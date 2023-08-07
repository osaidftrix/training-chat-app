import { describe, test, expect } from 'vitest';
import { Provider } from 'react-redux';
import { create } from 'react-test-renderer';
import { PersistGate } from 'redux-persist/integration/react';
import UserList from './userlist';
import { persistor, store } from '../../../store';

describe('<UserList />', () => {
  test('UserList mounts properly', () => {
    const renderer = create(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <UserList toggledUser={'testuser'} setToggledUser={() => {}} />
        </PersistGate>
      </Provider>,
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
