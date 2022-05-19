import { useAppSelector } from 'hooks/redux';
import { useTranslation } from 'react-i18next';
import { useSearchUserQuery } from 'store/apis/publicProfile';
// import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UploadFile, UploadFileStatus } from 'antd/lib/upload/interface';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
// import { colors } from 'constants/index';
import 'antd/dist/antd.min.css';

import avatar from '../../assets/avatar.png';

import {
    ProfileContainer,
    Avatar,
    Page,
    ButtonSet,
    TitleEmpty,
} from './styles';

interface File {
    uid: string;
    name: string;
    url: string;
    status?: UploadFileStatus;
}

const SettingPage: React.FC = () => {
    const { t } = useTranslation();
    const { user } = useAppSelector((s) => s.authReducer);
    const { data } = useSearchUserQuery(user?.id);

    const [fileList, setFileList] = useState<File[]>([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onChange = ({ fileList: newFileList }: any): void => {
        setFileList(newFileList);
    };

    const onPreview = async (file: UploadFile): Promise<void> => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve): void => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as Blob);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        if (typeof src === 'string') {
            const image = new Image();
            image.src = src;
            const imgWindow = window.open(src);
            imgWindow?.document.write(image.outerHTML);
        }
    };

    return (
        <Page>
            <ProfileContainer>
                <TitleEmpty>
                    {user?.firstName
                        ? `${user?.firstName} ${user?.lastName}`
                        : t('PublicProfile.user_name')}
                </TitleEmpty>
                <Avatar>
                    <img
                        src={data?.profileImage || avatar}
                        alt=""
                        width={140}
                    />
                    <ButtonSet>Upload photo</ButtonSet>
                </Avatar>
                <ImgCrop rotate>
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                    >
                        {fileList.length < 5 && '+ Upload'}
                    </Upload>
                </ImgCrop>
                {/* <Row justify="end">
                    <ButtonSet
                        onClick={() => navigate(`/contact_info/${user?.id}`)}
                        type="default"
                    >
                        {t('PublicProfile.contact_info')}
                    </ButtonSet>
                </Row> */}
            </ProfileContainer>
        </Page>
    );
};

export default SettingPage;
