import { Col, Row } from 'antd';
import * as React from 'react';
import {
    GoogleLogin,
    GoogleLogout,
    GoogleLoginResponse,
    GoogleLoginResponseOffline,
} from 'react-google-login';
import { useTranslation } from 'react-i18next';

interface IAuthGoogleProps {
    buttonText: string;
    onSuccess?: (
        response: GoogleLoginResponse | GoogleLoginResponseOffline
    ) => void;
    onFailure?: (error: unknown) => void;
    onLogOutSuccess?: () => void;
    onLogOutFailure?: () => void;
    isLogOut?: boolean;
    onRender?: (props: {
        onClick: () => void;
        disabled?: boolean;
    }) => JSX.Element;
}

const AuthGoogle: React.FC<IAuthGoogleProps> = ({
    buttonText,
    onSuccess,
    onFailure,
    onLogOutSuccess,
    onLogOutFailure,
    isLogOut = false,
    onRender,
}) => {
    const { t: translator } = useTranslation();

    return (
        <Row justify="center">
            <Col span={24}>
                {isLogOut ? (
                    <GoogleLogout
                        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                        buttonText={translator(buttonText)}
                        onLogoutSuccess={onLogOutSuccess}
                        onFailure={onLogOutFailure}
                        className="google-auth"
                        render={onRender}
                    />
                ) : (
                    <GoogleLogin
                        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                        buttonText={translator(buttonText)}
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy="single_host_origin"
                        theme="dark"
                        className="google-auth"
                    />
                )}
            </Col>
        </Row>
    );
};

export default AuthGoogle;
