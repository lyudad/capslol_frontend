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
    onChangeChat: (value: TChatArgument) => void;
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
}

export interface IRoom {
    id: number;
    isActive: boolean;
    proposalId: IProposal;
}

export interface IChatContentProps {
    currentChat: IRoom;
}
