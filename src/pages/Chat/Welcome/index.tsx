import React from 'react';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'hooks/redux';
import { useGetOffersQuery } from 'store/apis/chat';
import Loader from 'common/Loader/Loader';
import { WelcomeTitle, Wrapper, ChatBody } from './styles';
import ChatItem from '../ChatContent/ChatItem';

const Welcome: React.FC = () => {
    const { user } = useAppSelector((s) => s.authReducer);
    const { t } = useTranslation();

    const { data: offers, isLoading, isError } = useGetOffersQuery();

    return (
        <Wrapper>
            {offers?.length ? (
                <ChatBody>
                    {offers &&
                        offers?.map((itm, index) => (
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
                        {t('Chat.welcome')},{' '}
                        <span>{user?.firstName ? user?.firstName : ''}!</span>
                    </WelcomeTitle>
                    <WelcomeTitle>{t('Chat.welcomeText')}</WelcomeTitle>
                </>
            )}
            <>
                {isLoading && <Loader />}
                {isError && message.error('Not found any contacts')}
            </>
        </Wrapper>
    );
};

export default Welcome;
