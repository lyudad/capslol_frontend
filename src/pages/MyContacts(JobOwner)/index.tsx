import React, { useState } from 'react';
import { message } from 'antd';

import { Card, Wrapper } from 'pages/ContactInfo/styles';
import { useAppSelector } from 'hooks/redux';
import { useGetUserByIdQuery } from 'store/apis/profile';
import ChangePasswordBtn from 'pages/ContactInfo/ChangePasswordBtn';
import ContactInfoModal from 'pages/ContactInfo/ContactInfoModal';
import {
    useCreateProfileMutation,
    useSearchUserQuery,
    useUploadAvatarMutation,
} from 'store/apis/publicProfile';
import { newProfile } from 'store/apis/publicProfile/publicProfile.types';
import Spinner from 'components/Spinner';
import AboutCard from './About';
import ChangePhoto from './ChangeProfilePhoto';

const MyContacts: React.FC = () => {
    const { user } = useAppSelector((s) => s.auth);
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const [avatarUrl, setAvatarUrl] = useState();
    const [previewSource, setPreviewSource] = useState<string>('');

    const { data: userProfile } = useSearchUserQuery(user?.id);
    const [uploadAvatar] = useUploadAvatarMutation();
    const [createProfile] = useCreateProfileMutation();
    const { data, isLoading } = useGetUserByIdQuery(user?.id);
    const member = data?.data;

    const openModal = (): void => setIsOpen(true);

    const closeModal = (): void => setIsOpen(false);

    const previewFile = (file: Blob): void => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result as string);
        };
    };

    const handleChangePhoto = async (): Promise<void> => {
        try {
            const UpdateProfile: newProfile = {
                id: user?.id,
                profileImage: avatarUrl,
            };

            await createProfile(UpdateProfile);
        } catch (error) {
            message.error(error.status);
        }
    };

    const handleUploadImage = async (
        event: React.ChangeEvent
    ): Promise<void> => {
        try {
            const target = event.target as HTMLInputElement;
            const file = (target.files as FileList)[0];

            previewFile(file);

            const newFormData = new FormData();
            newFormData.append('file', file);
            newFormData.append('upload_preset', 'ycmt0cuu');
            const response = await uploadAvatar(newFormData).unwrap();

            setAvatarUrl(response.url);

            await handleChangePhoto();
        } catch (error) {
            message.error(error.message);
        }
    };

    return (
        <Wrapper>
            <ChangePhoto
                handleUploadImage={handleUploadImage}
                previewSource={previewSource}
                data={userProfile}
                user={member}
            />
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
