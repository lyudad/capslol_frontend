import React, { useState } from 'react';
import { message } from 'antd';

import avatar from 'assets/avatar.png';
import { TitleGroup, Circle, Title } from 'pages/ContactInfo/styles';
import {
    useCreateProfileMutation,
    useSearchUserQuery,
} from 'store/apis/publicProfile';
import { newProfile } from 'store/apis/publicProfile/publicProfile.types';
import { Avatar, StyledImg, Wrapper } from '../styles';
import { IChangePhotoProps } from '../props';
import FileUploader from '../FileUploader';

const ChangePhoto: React.FC<IChangePhotoProps> = ({ user }) => {
    const [createProfile] = useCreateProfileMutation();
    const [avatarUrl, setAvatarUrl] = useState();
    const [previewSource, setPreviewSource] = useState<string>('');

    const { data: userProfile } = useSearchUserQuery(user?.id);

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

    return (
        <TitleGroup mb="35">
            <Wrapper>
                {previewSource ? (
                    <Avatar>
                        <StyledImg src={previewSource} alt={user?.firstName} />
                    </Avatar>
                ) : (
                    <Avatar>
                        <StyledImg
                            src={userProfile?.profileImage || avatar}
                            alt={user?.firstName}
                        />
                    </Avatar>
                )}
                <FileUploader
                    previewFile={previewFile}
                    setAvatarUrl={setAvatarUrl}
                    handleChangePhoto={handleChangePhoto}
                />
            </Wrapper>
            <div>
                <Title fs="28">
                    {`${user?.firstName ? user?.firstName : 'Not'}
                        ${user?.lastName ? user?.lastName : 'Found'}`}
                </Title>
                <Circle>{user?.role ? user?.role : 'Not Found'}</Circle>
            </div>
        </TitleGroup>
    );
};

export default ChangePhoto;
