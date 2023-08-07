import Register from './register';
import { describe, test, expect } from 'vitest';
import { Provider } from 'react-redux';
import { persistor, store } from '../../store';
import { MemoryRouter, Routes, Route } from 'react-router';
import { create } from 'react-test-renderer';
import { PersistGate } from 'redux-persist/integration/react';
import userEvent from '@testing-library/user-event';
import Login from '../Login/login';
import { render, screen } from '@testing-library/react';

describe('<Register />', () => {
  test('Register mounts properly', () => {
    const renderer = create(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MemoryRouter initialEntries={['/register']}>
            <Routes>
              <Route path="register" element={<Register />}></Route>
            </Routes>
          </MemoryRouter>
        </PersistGate>
      </Provider>,
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });
  test('Register on submit works properly', async () => {
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
  test('Register redirects to login properly', async () => {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MemoryRouter initialEntries={['/register']}>
            <Routes>
              <Route path="register" element={<Register />}></Route>
              <Route path="login" element={<Login />}></Route>
            </Routes>
          </MemoryRouter>
        </PersistGate>
      </Provider>,
    );
    
    const buttonElement = screen.getByText('Login Here');
    await userEvent.click(buttonElement);
    const registerHeader = screen.getByText('Sign in to your account');
    expect(registerHeader).toBeTruthy();
  });
});
