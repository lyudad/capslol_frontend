import { io } from 'socket.io-client';
import React from 'react';
import { IProps } from './types';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || '';
export const appSocket = io(SOCKET_URL);
export const AppContext = React.createContext<IProps>({
    socket: appSocket,
});
