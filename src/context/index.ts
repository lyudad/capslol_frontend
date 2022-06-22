import { io } from 'socket.io-client';
import React from 'react';
import { IProps } from './types';

const SOCKET_URL =
    process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_DEVELOPMENT_URL
        : process.env.REACT_APP_SERVER_URL;
export const appSocket = io(SOCKET_URL as string);
export const AppContext = React.createContext<IProps>({
    socket: appSocket,
});
