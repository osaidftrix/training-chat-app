import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { store } from '../store';
import { IMessage, IUser, setConnectionInstance, setMessages } from '../store/slices/connectionSlice';
import { Navigate } from 'react-router';
import { AuthRoute } from '../components/AuthRoute/authRoute';
import Home from '../components/Home/home';
import Inbox from '../components/Inbox/inbox';
import Login from '../components/Login/login';
import { PrivateRoute } from '../components/PrivateRoute/privateRoute';
import Register from '../components/Register/register';
import { ReactNode } from 'react';

export const subscribeToWS = async () => {
  try {
    const connection = new HubConnectionBuilder()
      .withUrl('http://localhost:5156/hub/login')
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
    await connection.start();
    store.dispatch(
      setConnectionInstance({
        connectionInstance: connection,
      }),
    );
    console.log('Connection Established: ', connection);
  } catch (err) {
    console.log('err', err);
  }
};

interface IRegisterChatHandler {
  handlerName: string;
  target?: string | null;
  hubInstance: HubConnection;
}

export const registerChatHandler = async ({
  handlerName,
  target = null,
  hubInstance,
}: IRegisterChatHandler): Promise<void> => {
  try {
    if (!hubInstance?.on) return;
    hubInstance.on(handlerName, (message: IMessage) => {
      store.dispatch(setMessages({ target: target ?? message.username, message }));
      console.log(`Message Recieved on (${handlerName}): `, message);
    });
  } catch (err) {
    console.log(err, hubInstance);
  }
};

interface IRevokeChatHandler {
  handlerName: string;
  hubInstance: HubConnection;
}
export const revokeChatHandler = async ({ hubInstance, handlerName }: IRevokeChatHandler): Promise<void> => {
  try {
    hubInstance.off(handlerName);
  } catch (err) {
    console.log(err);
  }
};

export const getLoggedInUsers = async (hubInstance: HubConnection): Promise<IUser[] | false> => {
  if (!hubInstance?.invoke) return false;
  const loggedInUsers: string[] = (await hubInstance.invoke('GetLoggedInUsers')) ?? [];
  const formattedLoggedInUsers: IUser[] = loggedInUsers.map((username) => ({ username }));
  return formattedLoggedInUsers;
};

interface IRoutes {
  path: string;
  element: ReactNode;
}

export const getRoutes = (isAuthenticated: boolean): IRoutes[] => {
  return [
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
      element: <Navigate to={`${isAuthenticated ? '/' : '/login'}`} />,
    },
  ];
};

export const delay = (delayInms: number) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
}