import { Col, message, notification, Row } from "antd";
import { RequestHeader } from "constants/request.constants";
import * as React from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLazySignUpUseGoogleQuery } from "store/apis/auth";
import { setCredentials } from "store/slices/auth/auth.slice";

const AuthGoogle: React.FC = () => {
  const [createGoogleUser] = useLazySignUpUseGoogleQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    try {
      if (RequestHeader.ACCESS_TOKEN in response) {
        const authResponse = await createGoogleUser(response.tokenId).unwrap();
        dispatch(setCredentials(authResponse));

        notification.open({
          message: "Congratulation!",
          description: "New User was created!",
          onClick: () => {
            console.log("Notification Clicked!");
          },
        });

        navigate("/select-role");
      }
    } catch (error: any) {
      if (error.data.message) {
        message.error(error.data.message);
      }
    }
  };

  const handleFailure = (error: any) => {
    message.error(error);
  };
  return (
    <Row justify="center">
      <Col span={24}>
        <GoogleLogin
          clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
          buttonText="Sign up with Google"
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy={"single_host_origin"}
          theme="dark"
          className="google-auth"
        />
      </Col>
    </Row>
  );
};

export default AuthGoogle;
