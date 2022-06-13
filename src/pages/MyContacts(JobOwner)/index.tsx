import React, { useState } from 'react';

import { Card, Wrapper } from 'pages/ContactInfo/styles';
import { useAppSelector } from 'hooks/redux';
import { useGetUserByIdQuery } from 'store/apis/profile';
import ChangePasswordBtn from 'pages/ContactInfo/ChangePasswordBtn';
import ContactInfoModal from 'pages/ContactInfo/ContactInfoModal';
import Spinner from 'components/Spinner';
import AboutCard from './About';
import ChangePhoto from './ChangeProfilePhoto';

const MyContacts: React.FC = () => {
    const { user } = useAppSelector((s) => s.auth);
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);

    const { data, isLoading } = useGetUserByIdQuery(user?.id);
    const member = data?.data;

    const openModal = (): void => setIsOpen(true);

    const closeModal = (): void => setIsOpen(false);

    return (
        <Wrapper>
            <ChangePhoto user={member} />
            <Card>
                <AboutCard label="userFirstName" member={member?.firstName} />
                <AboutCard label="userLastName" member={member?.lastName} />
                <AboutCard label="userEmail" member={member?.email} />
                <AboutCard label="userPhone" member={member?.phoneNumber} />
                <ChangePasswordBtn openModal={openModal} />
            </Card>

            <ContactInfoModal
                state={user?.id}
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
            />
            {isLoading && <Spinner />}
        </Wrapper>
    );
};

export default MyContacts;
