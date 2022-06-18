/* eslint-disable @typescript-eslint/no-explicit-any */
import { IChatMember, IProposal } from 'store/apis/chat/chat.types';
import { IOwner } from 'store/apis/jobs/jobs.types';

export interface IAvatarProps {
    id: number;
}

export interface IChatItemProps {
    animationDelay: number;
    msg: IMessages;
}

export type TChatArgument = IRoom | undefined;

export interface IChatListProps {
    members: IChatMember[] | undefined;
}

export type IChatMemberArg = IChatMember[] | undefined;

export enum Role {
    jobOwner = 'Job Owner',
}

export interface IMessages {
    id: number;
    content: string;
    createdAt: string;
    senderId: IOwner;
    roomId: IRoom;
    isOffer?: boolean;
}

export interface IRoom {
    id: number;
    isActive: boolean;
    proposalId: IProposal;
}

export interface IChatContentProps {
    currentChat: IRoom;
}

export interface IProps {
    color?: string;
    bg?: string;
}

export interface IChatWindow {
    modalIsOpen: boolean;
    closeModal: () => void;
    price: number;
    hourRate: number;
    handleHourRateChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
    handleOffer: () => void;
}

export type TEmoji = any;

export type TEvent = any;

export interface IEmojiProps {
    onEmojiClick: (event: TEvent, emojiObject: TEmoji) => void;
}
