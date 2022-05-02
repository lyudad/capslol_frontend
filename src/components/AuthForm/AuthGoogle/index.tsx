import { Col, Row } from "antd";
import { StyledParagraph } from "components/UI";
import * as React from "react";
import { StyledLink } from "./style";
import { GoogleLogin } from 'react-google-login'

interface IAuthGoogle {
  text?: string
  translator?: (message: string) => string;
  href?: string
}

const AuthGoogle: React.FunctionComponent<IAuthGoogle> = ({ translator, text, href }) => {

  const handleLogin = (googleData: any) => {
    console.log(googleData)
  }

  const handleFailure = (result: any) => {
    alert(result)
  }
  return (
    <Row justify="center">
      <Col span={24}>
        <GoogleLogin clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy={'single_host_origin'} 
          theme="dark"
          className="google-auth"
          />
          
      </Col>
    </Row>
  );
};

export default AuthGoogle;