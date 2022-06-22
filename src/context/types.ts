import { TChatArgument } from 'pages/Chat/interfaces';
import { Socket } from 'socket.io-client';

export interface IProps {
    socket: Socket;
    currentChat?: TChatArgument;
    setCurrentChat?: React.Dispatch<React.SetStateAction<TChatArgument>>;
}
