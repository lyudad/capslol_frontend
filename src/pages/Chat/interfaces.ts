/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IChatUser {
    active: boolean | undefined;
    id: number;
    image: string;
    isOnline: boolean | undefined;
    name: string;
    project: string;
}

export interface IChatOffer {
    sender: {
        name: string;
        id: number;
        project: string;
    };
    to: {
        name: string;
        id: number;
    };
    message: string;
    messageType: string;
    id: number;
}

export interface IMessages {
    id: number;
    sender: {
        pic: string;
        id: number;
        name: string;
    };
    content: string;
    chat: number;
}
export interface IChatListProps {
    onChangeChat: (value: TChatArgument) => void;
    contacts: IChatUser[];
}
export interface IAvatarProps {
    image: string;
    alt: string;
    isOnline?: string | boolean;
}

export interface IChatItemProps {
    animationDelay: number;
    msg: any;
}

export interface IChatContentProps {
    currentChat: IChatUser;
}

export type TChatArgument = IChatUser | undefined;
