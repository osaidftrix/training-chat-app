import { describe, test } from 'vitest';
import { Provider } from 'react-redux';
import { persistor, store } from '../../store';
import { MemoryRouter, Routes, Route } from 'react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { PrivateRoute } from './privateRoute';
import { render, screen } from '@testing-library/react';
import { initialState, setConnection } from '../../store/slices/connectionSlice';

describe('<PrivateRoute />', () => {
  test('PrivateRoute renders properly', () => {
    const { container } = render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MemoryRouter initialEntries={['/test']}>
            <Routes>
              <Route
                path="/test"
                element={
                  <PrivateRoute
                    redirectPath={'/'}
                    component={
                      <div>
                        <span>Authenticated</span>
                      </div>
                    }
                  />
                }
              ></Route>
              <Route
                path="/"
                element={
                  <div>
                    <span>Not Authenticated</span>
                  </div>
                }
              ></Route>
            </Routes>
          </MemoryRouter>
        </PersistGate>
      </Provider>,
    );
    expect(container).toBeTruthy();
  });

  test('PrivateRoute redirects to default route if not authenticated', () => {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MemoryRouter initialEntries={['/test']}>
            <Routes>
              <Route
                path="/test"
                element={
                  <PrivateRoute
                    redirectPath={'/'}
                    component={
                      <div>
                        <span>Authenticated</span>
                      </div>
                    }
                  />
                }
              ></Route>
              <Route
                path="/"
                element={
                  <div>
                    <span>Not Authenticated</span>
                  </div>
                }
              ></Route>
            </Routes>
          </MemoryRouter>
        </PersistGate>
      </Provider>,
    );
    const element = screen.getByText('Not Authenticated');
    expect(element).toBeTruthy();
  });

  test('PrivateRoute does not redirect to default route if authenticated', () => {
    store.dispatch(
      setConnection({...initialState, isAuthenticated: true}),
    );
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MemoryRouter initialEntries={['/test']}>
            <Routes>
              <Route
                path="/test"
                element={
                  <PrivateRoute
                    redirectPath={'/'}
                    component={
                      <div>
                        <span>Authenticated</span>
                      </div>
                    }
                  />
                }
              ></Route>
              <Route
                path="/"
                element={
                  <div>
                    <span>Not Authenticated</span>
                  </div>
                }
              ></Route>
            </Routes>
          </MemoryRouter>
        </PersistGate>
      </Provider>,
    );
    const element = screen.getByText('Authenticated');
    expect(element).toBeTruthy();
  });
});
