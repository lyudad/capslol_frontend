import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';

import { useAppSelector } from 'hooks/redux';
import { WelcomeTitle, Wrapper, ChatBody } from './styles';
import ChatItem from '../ChatContent/ChatItem';
import { IChatOffer, IMessages } from '../interfaces';

const Welcome: React.FC = () => {
    const { user } = useAppSelector((s) => s.authReducer);
    const [offers, setOffers] = useState<IChatOffer[] | IMessages[]>([]);

    const fetchOffers = async (): Promise<void> => {
        try {
            const { data } = await axios.get(`http://localhost:3002/offers`);
            setOffers(data);
        } catch (e) {
            message.error(`Coudn\`t get offers ${e}`);
        }
    };

    useEffect(() => {
        fetchOffers();
    }, []);

    return (
        <Wrapper>
            {offers.length ? (
                <ChatBody>
                    {offers &&
                        offers.map((itm, index) => (
                            <ChatItem
                                animationDelay={index + 2}
                                key={itm.id}
                                msg={itm}
                            />
                        ))}
                </ChatBody>
            ) : (
                <>
                    <WelcomeTitle>
                        Welcome,{' '}
                        <span>{user?.firstName ? user?.firstName : ''}!</span>
                    </WelcomeTitle>
                    <WelcomeTitle>
                        Please select a chat to Start messaging.
                    </WelcomeTitle>
                </>
            )}
        </Wrapper>
    );
};

export default Welcome;
