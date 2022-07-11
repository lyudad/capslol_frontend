/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { notification } from 'antd';

import { NoteBox } from 'components/EmptyListNotification/styles';
import { Paths } from 'router/paths';
import { useConfirmUserEmailMutation } from 'store/apis/auth';
import Spinner from 'components/Spinner';
import { useDispatch } from 'react-redux';
import { setCredentials } from 'store/slices/auth/auth.slice';
import { IConfirmEmailRequest, IResponse } from 'store/slices/auth/auth.type';
import { StyledNavLink, WrapperTitle } from './styles';

const EmailConfirmation: React.FC = () => {
    const [params] = useSearchParams();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [confirmEmail, { data, isLoading }] = useConfirmUserEmailMutation();
    const confirmToken: IConfirmEmailRequest = {
        token: params.get('token')?.toString(),
    };

    const isEmailConfirmed = data?.data?.user?.isConfirmed;

    const handleConfirm = async (): Promise<void> => {
        try {
            const confirmUser = await confirmEmail(confirmToken).unwrap();
            // const userEmailConfirmed = confirmUser?.data?.user?.isConfirmed;
            // const message = confirmUser?.message as string;

            // const response: IResponse = {
            //     data: { user: { isConfirmed: userEmailConfirmed } },
            //     message,
            // };
            // dispatch(setCredentials(response));
        } catch (error) {
            notification.error(error?.data?.message);
        }
    };

    useEffect(() => {
        handleConfirm();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    return (
        <NoteBox>
            {isEmailConfirmed ? (
                <WrapperTitle>
                    {t('EmailConfirm.fineTitle')}{' '}
                    <StyledNavLink to={Paths.SIGN_IN}>
                        {t('EmailConfirm.signIn')}
                    </StyledNavLink>
                    .
                </WrapperTitle>
            ) : (
                <WrapperTitle>{t('EmailConfirm.poorTitle')}</WrapperTitle>
            )}
            <> {isLoading && <Spinner />}</>
        </NoteBox>
    );
};

export default EmailConfirmation;
