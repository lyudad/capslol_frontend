import React, { useState } from 'react';
import { notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

import { colors } from 'constants/index';
import Button from 'components/Button/Button';
import { useGetUserByIdQuery } from 'store/apis/profile';
import Spinner from 'components/Spinner';
import AboutCard from 'pages/MyContacts(JobOwner)/About';
import { IContactInfo } from './interfaces';
import { Wrapper, TitleGroup, Title, Block, Card } from './styles';
import ContactInfoModal from './ContactInfoModal';
import RoleAndName from './TitleGroup';
import ChangePasswordBtn from './ChangePasswordBtn';

const ContactInfo: React.FC = () => {
    const location = useLocation();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [modalIsOpen, setIsOpen] = useState<boolean>(false);

    const state = location.state as IContactInfo;

    const { data: member, isLoading, isError } = useGetUserByIdQuery(state.id);
    const user = member?.data;

    const handleNavigate = (): void => navigate(-1);

    const openModal = (): void => setIsOpen(true);

    const closeModal = (): void => setIsOpen(false);

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
                            <RoleAndName user={user} />

                            <Card>
                                <AboutCard
                                    label="userFirstName"
                                    member={user?.firstName}
                                />
                                <AboutCard
                                    label="userLastName"
                                    member={user?.lastName}
                                />
                                <AboutCard
                                    label="userEmail"
                                    member={user?.email}
                                />
                                <AboutCard
                                    label="userPhone"
                                    member={user?.phoneNumber}
                                />

                                <ChangePasswordBtn openModal={openModal} />
                            </Card>
                        </div>
                    </Block>
                </>
            )}

            <ContactInfoModal
                state={state?.id}
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
            />

            <>
                {' '}
                {isLoading && <Spinner />}{' '}
                {isError &&
                    notification.error({
                        description: 'Error',
                        message:
                            'Something went wrong, please try again later!',
                    })}
            </>
        </Wrapper>
    );
};

export default ContactInfo;
