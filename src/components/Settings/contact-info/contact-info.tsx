import React, { useState } from "react";
import {
  InfoContainer,
  StyledInput,
  StyledLabel,
  ChangePassword,
  SubmitButton,
} from "./contact-info.styles";

const ContactInfo: React.FC = () => {
  const [isPassword, setIsPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [reEnter, setReEnter] = useState("");

  const passwordClick = (e: any) => {
    e.preventDefault();
    setIsPassword(!isPassword);
  };

  const handleClick = (e: any) => {
    e.preventDefault();

    console.log(password, reEnter);
  };

  return (
    <InfoContainer isChange={isPassword}>
      <form action="" className="info-form">
        <div className="inputs">
          <StyledLabel>First name:</StyledLabel>
          <StyledInput
            type="text"
            id="fname"
            name="fname"
            value="Askhat"
            readOnly
          />
        </div>
        <div className="inputs">
          <StyledLabel>Last name:</StyledLabel>
          <StyledInput
            type="text"
            id="lname"
            name="lname"
            value="Shailoobekov"
            readOnly
          />
        </div>
        <div className="inputs">
          <StyledLabel>Email:</StyledLabel>
          <StyledInput
            type="text"
            id="email"
            name="email"
            value="askhat.shailoobekov@gmail.com"
            readOnly
          />
        </div>
        <div className="pass-inputs">
          <div className="inputs">
            <StyledInput
              type="password"
              placeholder="New password*"
              id="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="inputs">
            <StyledInput
              type="password"
              placeholder="Re-enter password*"
              id="re-enter"
              name="re-enter"
              onChange={(e) => {
                setReEnter(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="change-password">
          <ChangePassword onClick={passwordClick} isChange={isPassword}>
            {isPassword ? "Cancel" : "ChangePassword"}
          </ChangePassword>
        </div>

        <SubmitButton isChange={isPassword} onClick={handleClick}>
          Save changes
        </SubmitButton>
      </form>
    </InfoContainer>
  );
};

export default ContactInfo;
