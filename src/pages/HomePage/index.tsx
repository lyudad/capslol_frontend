import React, { useState } from "react";
import { HomeContainer } from "./styles";
import SignUpForm from "components/SignInForm";

const HomePage: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  return <HomeContainer>{!isSignIn && <SignUpForm />}</HomeContainer>;
};

export default HomePage;
