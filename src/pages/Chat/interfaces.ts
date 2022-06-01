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
    id?: number | undefined;
}

export interface IMessages {
    id?: undefined;
    sender: {
        pic: string;
        id: number;
        name: string;
    };
    content: string;
    chat: number;
    isOffer?: boolean;
}
// export interface IChatListProps {
//     onChangeChat: (value: TChatArgument) => void;
//     contacts?: IChatUser[] | undefined;
// }
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

export interface IOfferAccept {
    id: number;
    chat: number;
}
