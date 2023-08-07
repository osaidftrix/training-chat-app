import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { HubConnection } from '@microsoft/signalr';

export interface IUser {
  username: string;
}
export interface IMessage extends IUser {
  message: string;
}
export interface IMessagePayload {
  target: string;
  message: IMessage;
}
export interface Message {
  [key: string]: IMessage[];
}

export interface ConnectionState {
  connectionInstance: HubConnection | null;
  isAuthenticated: boolean;
  userName: string | null;
  connectionId: string | null;
  messages: Message;
  loggedInUsers: IUser[];
}

export const initialState: ConnectionState = {
  connectionInstance: null,
  isAuthenticated: false,
  userName: null,
  connectionId: null,
  messages: {
    public: [],
  },
  loggedInUsers: [],
};

export const counterSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    setLoggedInUsers: (state, action: PayloadAction<IUser[]>) => {
      state.loggedInUsers = action.payload;
    },
    setMessages: (state, action: PayloadAction<IMessagePayload>) => {
      if (!state.messages[action.payload.target]) {
        state.messages[action.payload.target] = [action.payload.message];
      } else {
        state.messages[action.payload.target] = [...state.messages[action.payload.target], action.payload.message];
      }
    },
    setConnection: (state, action: PayloadAction<ConnectionState>) => {
      const { connectionInstance, isAuthenticated, userName } = action.payload;
      state.connectionInstance = connectionInstance;
      state.isAuthenticated = isAuthenticated;
      state.userName = userName;
      state.messages = action.payload.messages;
      state.connectionId = action.payload.connectionId;
    },
    setConnectionInstance: (state, action: PayloadAction<{ connectionInstance: HubConnection }>) => {
      state.connectionInstance = action.payload.connectionInstance;
      state.isAuthenticated = false;
    },
    removeConnection: (state) => {
      if (state.connectionInstance) {
        state.connectionInstance
          .stop()
          .then((result) => {
            console.log('connection disconnected: ', result);
          })
          .catch((err) => {
            console.log('Connection Removal Error: ', err);
          });
      }
      state.connectionInstance = null;
    },

    logOut: (state) => {
      state.connectionInstance?.invoke('Logout', state.userName);
      state.isAuthenticated = false;
      state.connectionId = null;
      state.userName = null;
      state.loggedInUsers = [];
      state.messages = { public: [] };
    },
  },
});

export const { setConnection, removeConnection, setLoggedInUsers, setMessages, logOut, setConnectionInstance } =
  counterSlice.actions;

export const getConnection = (state: RootState) => state.connection;

export default counterSlice.reducer;
