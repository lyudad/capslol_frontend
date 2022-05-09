import React, { useState } from "react";
import { HomeContainer } from "./styles";
import SignUpForm from "components/SignUpForm";
import AuthForm from "components/AuthForm";

const HomePage: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  return <React.Fragment>{!isSignIn && <SignUpForm />}</React.Fragment>;
};

export default HomePage;
