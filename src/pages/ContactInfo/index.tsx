/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { message, Row, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { LeftOutlined, UserOutlined } from '@ant-design/icons';

import { colors } from 'constants/index';
import Button from 'components/Button/Button';
import {
    useEditUserValueMutation,
    useGetUserByIdQuery,
} from 'store/apis/profile';
import { Paths } from 'router/paths';
import Spinner from 'components/Spinner';
import { IContactInfo } from './interfaces';
import {
    Wrapper,
    TitleGroup,
    Title,
    Block,
    Card,
    Label,
    StyledAvatar,
    CardInfo,
    Icon,
    Circle,
    IconNotFound,
    EditIcon,
    StyledInput,
    SaveIcon,
} from './styles';
import ContactInfoModal from './ContactInfoModal';

const ContactInfo: React.FC = () => {
    const location = useLocation();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const [updateFirstName, setUpdateFirstName] = useState<boolean>(false);
    const [updateLastName, setUpdateLastName] = useState<boolean>(false);
    const [userPhoneNumber, setUserPhoneNumber] = useState<boolean>(false);
    const [updateUserFirstName, setUpdateUserFirstName] = useState<string>();
    const [updateUserLastName, setUpdateUserLastName] = useState<string>();
    const [phoneNumber, setPhoneNumber] = useState<string>();

    const state = location.state as IContactInfo;

    const [editUserValue, { isError: isUserError }] =
        useEditUserValueMutation();
    const { data: member, isLoading } = useGetUserByIdQuery(state.id);
    const user = member?.data;

    const handleNavigate = (): void => navigate(Paths.PROFILE);

    const openModal = (): void => setIsOpen(true);

    const closeModal = (): void => setIsOpen(false);

    const handleEditUserFirstName = (): void => setUpdateFirstName(true);

    const handleEditUserLastName = (): void => setUpdateLastName(true);

    const AddUserUserPhoneNumber = (): void => setUserPhoneNumber(true);

    const handleEdit = async (
        updateKey: string,
        updateValue: string | undefined,
        msg: string
    ): Promise<void> => {
        try {
            await editUserValue({
                id: user?.id,
                [updateKey]: updateValue,
            });

            notification.success({
                message: t(`ContactInfo.${msg}`),
            });
        } catch (error) {
            notification.error({
                message: t(`${error?.data?.message}`),
            });
        }
    };

    const handleUpdate = async (value: string): Promise<void | boolean> => {
        switch (value) {
            case 'firstName':
                await handleEdit(
                    'firstName',
                    updateUserFirstName,
                    'changedFirstName'
                );
                setUpdateFirstName(false);
                break;
            case 'lastName':
                await handleEdit(
                    'lastName',
                    updateUserLastName,
                    'changedLastName'
                );
                setUpdateLastName(false);
                break;
            case 'phoneNumber':
                await handleEdit('phoneNumber', phoneNumber, 'addPhoneNumber');
                setUserPhoneNumber(false);
                break;
            default:
                return false;
        }
    };

    return (
        <Wrapper>
            {user && (
                <>
                    <TitleGroup mb="50">
                        <Button
                            onClick={handleNavigate}
                            mr="20"
                            color={colors.btnWhite}
                            bg={colors.btnDarkBlue}
                        >
                            <LeftOutlined />
                        </Button>
                        <Title fs="35">{t('ContactInfo.title')}</Title>
                    </TitleGroup>

                    <Block>
                        <div>
                            <TitleGroup mb="35">
                                <StyledAvatar
                                    size={64}
                                    icon={<UserOutlined />}
                                />
                                <div>
                                    <Title fs="28">
                                        {`${
                                            user?.firstName
                                                ? user?.firstName
                                                : 'Not'
                                        }
                                        ${
                                            user?.lastName
                                                ? user?.lastName
                                                : 'Found'
                                        }`}
                                    </Title>
                                    <Circle>
                                        {user?.role ? user?.role : 'Not Found'}
                                    </Circle>
                                </div>
                            </TitleGroup>
                            <Card>
                                <CardInfo>
                                    <Label>
                                        {t('ContactInfo.userFirstName')}
                                    </Label>
                                    <TitleGroup justify="space-between">
                                        <Title fs="16">
                                            {updateFirstName ? (
                                                <StyledInput
                                                    defaultValue={
                                                        user?.firstName
                                                    }
                                                    value={updateUserFirstName}
                                                    onChange={(e) =>
                                                        setUpdateUserFirstName(
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                />
                                            ) : (
                                                <span>{user?.firstName}</span>
                                            )}
                                        </Title>
                                        <Row>
                                            {updateFirstName ? (
                                                <SaveIcon
                                                    onClick={() =>
                                                        handleUpdate(
                                                            'firstName'
                                                        )
                                                    }
                                                />
                                            ) : (
                                                <EditIcon
                                                    onClick={
                                                        handleEditUserFirstName
                                                    }
                                                />
                                            )}
                                            {user?.firstName ? (
                                                <Icon />
                                            ) : (
                                                <IconNotFound />
                                            )}
                                        </Row>
                                    </TitleGroup>
                                </CardInfo>

                                <CardInfo>
                                    <Label>
                                        {t('ContactInfo.userLastName')}
                                    </Label>
                                    <TitleGroup justify="space-between">
                                        <Title fs="16">
                                            {updateLastName ? (
                                                <StyledInput
                                                    defaultValue={
                                                        user?.lastName
                                                    }
                                                    value={updateUserLastName}
                                                    onChange={(e) =>
                                                        setUpdateUserLastName(
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                />
                                            ) : (
                                                <span>{user?.lastName}</span>
                                            )}
                                        </Title>
                                        <Row>
                                            {updateLastName ? (
                                                <SaveIcon
                                                    onClick={() =>
                                                        handleUpdate('lastName')
                                                    }
                                                />
                                            ) : (
                                                <EditIcon
                                                    onClick={
                                                        handleEditUserLastName
                                                    }
                                                />
                                            )}
                                            {user?.lastName ? (
                                                <Icon />
                                            ) : (
                                                <IconNotFound />
                                            )}
                                        </Row>
                                    </TitleGroup>
                                </CardInfo>

                                <CardInfo>
                                    <Label>{t('ContactInfo.userEmail')}</Label>
                                    <TitleGroup justify="space-between">
                                        <Title fs="16">{user?.email}</Title>
                                        {user?.email ? (
                                            <Icon />
                                        ) : (
                                            <IconNotFound />
                                        )}
                                    </TitleGroup>
                                </CardInfo>

                                <CardInfo>
                                    <Label>{t('ContactInfo.userPhone')}</Label>
                                    <TitleGroup justify="space-between">
                                        <Title fs="16">
                                            {userPhoneNumber ? (
                                                <StyledInput
                                                    defaultValue={
                                                        user?.phoneNumber || ''
                                                    }
                                                    value={phoneNumber}
                                                    onChange={(e) =>
                                                        setPhoneNumber(
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                />
                                            ) : (
                                                <span>
                                                    {user?.phoneNumber
                                                        ? user?.phoneNumber
                                                        : 'You phone number is empty'}
                                                </span>
                                            )}
                                        </Title>
                                        <Row>
                                            {userPhoneNumber ? (
                                                <SaveIcon
                                                    onClick={() =>
                                                        handleUpdate(
                                                            'phoneNumber'
                                                        )
                                                    }
                                                />
                                            ) : (
                                                <EditIcon
                                                    onClick={
                                                        AddUserUserPhoneNumber
                                                    }
                                                />
                                            )}
                                            {user?.phoneNumber ? (
                                                <Icon />
                                            ) : (
                                                <IconNotFound />
                                            )}
                                        </Row>
                                    </TitleGroup>
                                </CardInfo>

                                <CardInfo>
                                    <Label>
                                        {t('ContactInfo.userPassword')}
                                    </Label>
                                    <TitleGroup justify="space-between">
                                        <Title fs="16">********</Title>
                                        <Button
                                            onClick={() => openModal()}
                                            color={colors.btnWhite}
                                            bg={colors.btnDarkBlue}
                                        >
                                            {t('ContactInfo.btnChangeText')}
                                        </Button>
                                    </TitleGroup>
                                </CardInfo>
                            </Card>
                        </div>
                        <>
                            {' '}
                            {isUserError &&
                                message.error(
                                    'Something went wrong, please try again'
                                )}
                        </>
                    </Block>
                </>
            )}

            <ContactInfoModal
                state={state}
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
            />

            <> {isLoading && <Spinner />}</>
        </Wrapper>
    );
};

export default ContactInfo;
