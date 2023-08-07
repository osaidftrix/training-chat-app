import { describe, test, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router';
import Login from './login';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../../store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from '../Register/register';

describe('<Login />', () => {
  test('Login renders correctly', () => {
    const element = render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MemoryRouter initialEntries={['/login']}>
            <Routes>
              <Route path="login" element={<Login />}></Route>
            </Routes>
          </MemoryRouter>
        </PersistGate>
      </Provider>,
    );
    expect(element).toBeTruthy();
  });
  test('Login on submit works properly', async () => {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MemoryRouter initialEntries={['/login']}>
            <Routes>
              <Route path="login" element={<Login />}></Route>
            </Routes>
          </MemoryRouter>
        </PersistGate>
      </Provider>,
    );
    const buttonElement = screen.getByRole('button');
    await userEvent.click(buttonElement);
    expect(buttonElement).toBeTruthy();
  });
  test('Login redirects to register properly', async () => {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MemoryRouter initialEntries={['/login']}>
            <Routes>
              <Route path="login" element={<Login />}></Route>
              <Route path="register" element={<Register />}></Route>
            </Routes>
          </MemoryRouter>
        </PersistGate>
      </Provider>,
    );
    const buttonElement = screen.getByText('Sign Up');
    await userEvent.click(buttonElement);
    const registerHeader = screen.getByText('Register to Chat');
    expect(registerHeader).toBeTruthy();
  });
});
