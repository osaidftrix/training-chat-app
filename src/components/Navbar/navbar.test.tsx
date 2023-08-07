import { describe, test, expect } from 'vitest';
import { Provider } from 'react-redux';
import { persistor, store } from '../../store';
import NavBar from './navbar';
import { MemoryRouter, Routes, Route } from 'react-router';
import { create } from 'react-test-renderer';
import { PersistGate } from 'redux-persist/integration/react';

describe('<NavBar />', () => {
  test('NavBar renders properly', () => {
    const renderer = create(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<NavBar />}></Route>
            </Routes>
          </MemoryRouter>
        </PersistGate>
      </Provider>,
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
