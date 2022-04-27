interface Colors {
  [key: string]: string;
}

interface Fonts {
  [key: string]: string;
}

export const colors: Colors = {
  testPageColor: "#202020",
  testReusableColor: "#c3ab25",
  brandColor: "#4caf50",
  appBarBrd: "rgba(76, 175, 80, 0.3)",
  appBarBgr: "rgba(0, 0, 0, 0.8)",
  formWrapperBgr: "rgba(0, 0, 0, 0.8)",
  signUpFormBrd: "#d9d9d9",
  homeBgr: "#010101",
  navColor: "#fff",
  signUpFormColor: "#fff",
};

export const fonts: Fonts = {
  logoFontFamily: "Dodger",
  logoFontSize: "26px",
  primeLogoFontSize: "20px",
  logoLineHeight: "1.1",
  navFontSize: "14px",
  logoFontWeight: "400",
  signUpButtonsFontWeight: "500",
};
