/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import avatar from 'assets/avatar.png';
import { TitleGroup, Circle, Title } from 'pages/ContactInfo/styles';
import { Avatar, StyledImg } from '../styles';
import { IChangePhotoProps } from '../props';

const ChangePhoto: React.FC<IChangePhotoProps> = ({
    previewSource,
    data,
    handleUploadImage,
    user,
}) => {
    return (
        <TitleGroup mb="35">
            <div>
                {previewSource ? (
                    <Avatar>
                        <StyledImg src={previewSource} alt={user?.firstName} />
                    </Avatar>
                ) : (
                    <Avatar>
                        <StyledImg
                            src={data?.profileImage || avatar}
                            alt={user?.firstName}
                        />
                    </Avatar>
                )}

                <input
                    style={{ marginTop: 10, width: 114 }}
                    type="file"
                    name="image"
                    onChange={handleUploadImage}
                />
            </div>
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
