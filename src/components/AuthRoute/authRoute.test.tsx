
import { describe, test } from 'vitest';
import { Provider } from 'react-redux';
import { persistor, store } from '../../store';
import { MemoryRouter, Routes, Route } from 'react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { AuthRoute } from './authRoute';
import { render, screen } from '@testing-library/react';
import { initialState, setConnection } from '../../store/slices/connectionSlice';

describe('<AuthRoute />', () => {
  test('AuthRoute renders properly', () => {
    const { container } = render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MemoryRouter initialEntries={['/test']}>
            <Routes>
              <Route
                path="/test"
                element={
                  <AuthRoute
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

  test('AuthRoute renders login if not authenticated', () => {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MemoryRouter initialEntries={['/login']}>
            <Routes>
              <Route
                path="/login"
                element={
                  <AuthRoute
                    redirectPath={'/protected'}
                    component={
                      <div>
                        <span>Login</span>
                      </div>
                    }
                  />
                }
              ></Route>
              <Route
                path="/protected"
                element={
                  <div>
                    <span>Protected</span>
                  </div>
                }
              ></Route>
            </Routes>
          </MemoryRouter>
        </PersistGate>
      </Provider>,
    );
    const element = screen.getByText('Login');
    expect(element).toBeTruthy();
  });

  test('Authroute redirects to protected route if authenticated', () => {
    store.dispatch(
      setConnection({...initialState, isAuthenticated: true}),
    );
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MemoryRouter initialEntries={['/login']}>
            <Routes>
              <Route
                path="/login"
                element={
                  <AuthRoute
                    redirectPath={'/protected'}
                    component={
                      <div>
                        <span>Authenticated</span>
                      </div>
                    }
                  />
                }
              ></Route>
              <Route
                path="/protected"
                element={
                  <div>
                    <span>Protected</span>
                  </div>
                }
              ></Route>
            </Routes>
          </MemoryRouter>
        </PersistGate>
      </Provider>,
    );
    const element = screen.getByText('Protected');
    expect(element).toBeTruthy();
  });
});
