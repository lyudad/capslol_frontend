/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { AppContext } from 'context';

import LiveNotification from 'components/LiveNotification';
import { setNewMessageCount } from 'store/slices/auth/auth.slice';
import Avatar from './Avatar';
import {
    ChatListItem,
    ChatLists,
    ChatProject,
    ChatUser,
    Input,
    SearchWrap,
    Wrapper,
    StyledRow,
} from './styles';
import { IChatListProps, TChatArgument } from '../interfaces';

const ChatList: React.FC<IChatListProps> = ({ members }) => {
    const { user } = useAppSelector((s) => s.auth);
    const [search, setSearch] = useState<string>('');
    const [currentSelected, setCurrentSelected] = useState<number>();
    const { setCurrentChat } = useContext(AppContext);
    const dispatch = useAppDispatch();
    const messagesCount = useAppSelector((state) => state.auth.newMessageCount);
    const changeChat = (id: number, chat: TChatArgument): void => {
        setCurrentSelected(id);
        setCurrentChat?.(chat);
        const newMessCount = messagesCount.filter((item) => item !== id);
        dispatch(setNewMessageCount([...newMessCount]));
    };

    const onChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newValue = event.currentTarget.value;
        setSearch(newValue);
    };

    const roomCount = (roomId: number): number => {
        if (roomId) {
            const currentRoomCount = messagesCount.filter(
                (item) => item === roomId
            );
            return currentRoomCount.length;
        }
        return 0;
    };

    return (
        <Wrapper>
            <SearchWrap>
                <Input
                    type="text"
                    onChange={(event) => onChange(event)}
                    placeholder="Search"
                />
            </SearchWrap>
            <ChatLists>
                {(members || []).map((member, index: number) => {
                    const freelancer = member?.proposalId?.freelancerId;
                    const jobOwner = member?.proposalId?.jobId?.ownerId;
                    const job = member?.proposalId?.jobId;

                    return (
                        <ChatListItem
                            key={member.id}
                            className={`${
                                member.id === currentSelected ? 'active' : ''
                            } `}
                            onClick={() => changeChat(member.id, member)}
                        >
                            <LiveNotification count={roomCount(member.id)} />

                            <Avatar
                                id={
                                    freelancer?.id === user?.id
                                        ? jobOwner?.id
                                        : freelancer?.id
                                }
                            />

                            <div>
                                <StyledRow>
                                    <ChatUser>
                                        {freelancer?.id === user?.id
                                            ? `${jobOwner?.firstName} ${jobOwner?.lastName}`
                                            : `${freelancer?.firstName} ${freelancer?.lastName}`}
                                    </ChatUser>
                                </StyledRow>
                                <ChatProject>{job?.title}</ChatProject>
                            </div>
                        </ChatListItem>
                    );
                })}
            </ChatLists>
        </Wrapper>
    );
};

export default ChatList;
