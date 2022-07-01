import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { NoteBox } from 'components/EmptyListNotification/styles';
import { Paths } from 'router/paths';
import { useConfirmUserEmailQuery } from 'store/apis/auth';
import Spinner from 'components/Spinner';
import { useDispatch } from 'react-redux';
import { setCredentials } from 'store/slices/auth/auth.slice';
import { IResponse } from 'store/slices/auth/auth.type';
import { StyledNavLink, WrapperTitle } from './styles';

const EmailConfirmation: React.FC = () => {
    const [params] = useSearchParams();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { data, isLoading } = useConfirmUserEmailQuery(
        params.get('token')?.toString()
    );

    const userEmailConfirmed = data?.data?.user?.isConfirmed;
    const message = data?.message as string;

    const response: IResponse = {
        data: { user: { isConfirmed: userEmailConfirmed } },
        message,
    };

    useEffect(() => {
        dispatch(setCredentials(response));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    return (
        <NoteBox>
            {userEmailConfirmed ? (
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
