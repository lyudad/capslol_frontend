import { Col, Row } from 'antd';
import * as React from 'react';
import {
    GoogleLogin,
    GoogleLoginResponse,
    GoogleLoginResponseOffline,
} from 'react-google-login';
import { useTranslation } from 'react-i18next';

interface IAuthGoogleProps {
    buttonText: string;
    onSuccess: (
        response: GoogleLoginResponse | GoogleLoginResponseOffline
    ) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onFailure: (error: any) => void;
}

const AuthGoogle: React.FC<IAuthGoogleProps> = ({
    buttonText,
    onSuccess,
    onFailure,
}) => {
    const { t: translator } = useTranslation();

    return (
        <Row justify="center">
            <Col span={24}>
                <GoogleLogin
                    clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                    buttonText={translator(buttonText)}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy="single_host_origin"
                    theme="dark"
                    className="google-auth"
                />
            </Col>
        </Row>
    );
};

export default AuthGoogle;
