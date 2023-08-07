import { describe, it } from 'vitest';
import { getLoggedInUsers, getRoutes } from './utils';
import { Navigate } from 'react-router';
import { AuthRoute } from '../components/AuthRoute/authRoute';
import Home from '../components/Home/home';
import Inbox from '../components/Inbox/inbox';
import Login from '../components/Login/login';
import { PrivateRoute } from '../components/PrivateRoute/privateRoute';
import Register from '../components/Register/register';
import { mockHubInstance } from './mockUtils';
import { HubConnection } from '@microsoft/signalr';

describe('getRoutes', () => {
  it('Routes return without authentication', () => {
    const routes = getRoutes(false);
    expect(routes).toStrictEqual([
      {
        path: '/',
        element: <PrivateRoute redirectPath="/login" component={<Home />} />,
      },

      {
        path: 'inbox',
        element: <PrivateRoute redirectPath="/login" component={<Inbox />} />,
      },
      {
        path: 'login',
        element: <AuthRoute redirectPath="/" component={<Login />} />,
      },
      {
        path: 'register',
        element: <AuthRoute redirectPath="/" component={<Register />} />,
      },
      {
        path: '*',
        element: <Navigate to={`${'/login'}`} />,
      },
    ]);
  });

  it('Routes returned with authentication', () => {
    const routes = getRoutes(true);
    expect(routes).toStrictEqual([
      {
        path: '/',
        element: <PrivateRoute redirectPath="/login" component={<Home />} />,
      },

      {
        path: 'inbox',
        element: <PrivateRoute redirectPath="/login" component={<Inbox />} />,
      },
      {
        path: 'login',
        element: <AuthRoute redirectPath="/" component={<Login />} />,
      },
      {
        path: 'register',
        element: <AuthRoute redirectPath="/" component={<Register />} />,
      },
      {
        path: '*',
        element: <Navigate to={`${'/'}`} />,
      },
    ]);
  });
});

describe('GetLoggedInUsers', () => {
  it('Get false if hub connection is not present', async () => {
    const instance = {} as HubConnection;
    const loggedInUsers = await getLoggedInUsers(instance);
    expect(loggedInUsers).toEqual(false);
  });

  it('Get users array if hub connection is present', async () => {
    const instance = mockHubInstance() as HubConnection; 
    const loggedInUsers = await getLoggedInUsers(instance);
    expect(loggedInUsers).toStrictEqual([{ username: 'testuser1' }, { username: 'testuser2' }]);
  });
});
