import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ModalWindow from 'components/ModalWindow/ModalWindow';
import { colors } from 'constants/index';
import { IPassword } from 'store/apis/profile/profile.types';
import { useChangePasswordMutation } from 'store/apis/profile';
import { logOut } from 'store/slices/auth/auth.slice';

import { StyledForm } from 'pages/ForgotPassword/styles';

import { Paths } from 'router/paths';
import ChangePassword from 'components/ChangePassword';
import { IChangePassword } from 'components/ChangePassword/props';
import { IModalProps } from '../interfaces';
import { Label } from '../styles';

const ContactInfoModal: React.FC<IModalProps> = ({
    state,
    modalIsOpen,
    closeModal,
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { t } = useTranslation();
    const [form] = StyledForm.useForm<IChangePassword>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let timer: ReturnType<typeof setTimeout>;

    const onReset = (): void => form.resetFields();

    const enterLoading = (): void => setLoading(true);

    const [changePassword, { isError, isSuccess }] =
        useChangePasswordMutation();

    const handleLogOut = (): void => {
        timer = setTimeout(() => {
            dispatch(logOut());
            navigate(Paths.HOME);
        }, 500);
    };

    const onFinish = async (values: IChangePassword): Promise<void> => {
        enterLoading();
        try {
            const value: IPassword = {
                id: state,
                password: values.confirmPassword,
            };
            await changePassword(value).unwrap();
            onReset();
            setLoading(false);
            handleLogOut();
        } catch (error) {
            message.error(error.data.message);
        }
    };

    useEffect(() => {
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ModalWindow
            modalIsOpen={modalIsOpen}
            closeModal={() => closeModal()}
            bg={colors.passwordBg}
            modalBg={colors.bgBlack}
        >
            {isSuccess || isError || (
                <ChangePassword onFinish={onFinish} loading={loading} />
            )}

            <>
                {' '}
                {isSuccess && (
                    <Label pd="5px 0 5px 0">
                        {t('ContactInfo.afterChangePassword.success')}
                    </Label>
                )}
                {isError && (
                    <Label pd="5px 0 5px 0">
                        {t('ContactInfo.afterChangePassword.error')}
                    </Label>
                )}
            </>
        </ModalWindow>
    );
};

export default ContactInfoModal;
