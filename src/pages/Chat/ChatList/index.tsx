/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from 'react';

import { useAppSelector } from 'hooks/redux';
import { AppContext } from 'context';
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

    const changeChat = (id: number, chat: TChatArgument): void => {
        setCurrentSelected(id);
        setCurrentChat?.(chat);
    };

    const onChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newValue = event.currentTarget.value;
        setSearch(newValue);
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
                            style={{ animationDelay: `0.${index + 1}ms` }}
                            className={`${
                                member.id === currentSelected ? 'active' : ''
                            } `}
                            onClick={() => changeChat(member.id, member)}
                        >
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
