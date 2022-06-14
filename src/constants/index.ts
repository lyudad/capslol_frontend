import { EnglishLevel, ProjectDuration } from 'types/common.types';

interface Colors {
    [key: string]: string;
}

interface Fonts {
    [key: string]: string;
}

export const colors: Colors = {
    testPageColor: '#202020',
    testReusableColor: '#c3ab25',
    titleOfSectionsProfile: '#8d8d8d',
    lightBlue: '#8194e1',
    brandColor: '#4caf50',
    appBarBrd: 'rgba(76, 175, 80, 0.3)',
    appBarBgr: 'rgba(0, 0, 0, 0.8)',
    formWrapperBgr: 'rgba(0, 0, 0, 0.8)',
    signUpFormBrd: '#d9d9d9',
    homeBgr: '#010101',
    navColor: '#fff',
    black: '#000',
    signUpFormColor: '#fff',
    bgBlack: 'rgba(0, 0, 0, 0.8)',
    textWhite: '#fff',
    textGreen: '#4caf50',
    textWhiteGrey: '#d9d9d9',
    textWhiteRed: '#ff4d4f',
    linkColor: '#1890ff',
    bgWhiteDark: 'rgba(1,1,1,0.9)',
    modalBg: 'rgb(255, 255, 255)',
    modalWindowBg: 'rgba(255, 255, 255, 0.5)',
    textGrey: '#9aaa97',
    proposalWhite: '#e0e0e0',
    proposalGreen: '#4e944f',
    proposalWhiteGreen: '#83bd75',
    btnBoxShadow: 'rgba(255, 255, 255, 0)',
    btnOutline: 'rgba(255, 255, 255, 0.5)',
    btnShadow: 'rgba(255, 255, 255, 0.2)',
    btnTextShadow: '#427388',
    btnDarkBlue: '#161a1d',
    btnWhite: '#fafef6',
    labelText: '#ced4da',
    passwordBg: '#495057',
    passwordModalBg: '#343a40',
    hslaCircleRed: 'hsla(339, 100%, 55%, 1)',
    hslaCircleBlue: 'hsla(197, 100%, 64%, 1) ',
    chatTime: '#d1f5d3',
    chatContent: '#1A3C40',
    chatHeader: 'rgba(76, 175, 80, 0.3)',
    chatScrollTrack: 'rgba(33, 122, 34, 0.3)',
    chatNewMsg: '#243d25',
    chatNewMsgBtn: '#239d60',
    chatSearch: '#e6e5ea',
    chatUserTime: '#ceccd3',
    decline: '#ff8c8c',
    accept: '#65c18c',
    pending: '#1363df',
};

export const fonts: Fonts = {
    logoFontFamily: 'Dodger',
    logoFontWeight: '800',
    logoFontSize: '28px',
    loggedNameSize: '16px',
    primeLogoFontSize: '24px',
    logoLineHeight: '1.1',
    navFontSize: '14px',
    titlesOfProfile: '16px',
    signUpButtonsFontWeight: '500',
    homeMessageFontSize: '18px',
    jobListTitleSize: '24px',
    jobCardTitleSize: '20px',
    jobListFontWeight: '600',
};

export const langLevel: string[] = [
    'Beginner',
    'Pre-Intermediate',
    'Intermediate',
    'Advanced',
];

export const Img = {
    userLogo:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
};

export const projectDuration: string[] = [
    ProjectDuration.MORE_SIX_MONTHS,
    ProjectDuration.SIX_MONTHS,
    ProjectDuration.UNTIL_SIX_MONTHS,
];

export const englishLevel: string[] = [
    EnglishLevel.NOENGLISH,
    EnglishLevel.BEGINNER,
    EnglishLevel.PREINTERMEDIATE,
    EnglishLevel.INTERMEDIATE,
    EnglishLevel.ADVANCED,
];
export const dateFormat = 'D MMMM YYYY';

export const userRole = {
    freelancer: 'Freelancer',
    owner: 'Job Owner',
};

export const statusOfContract = {
    OPENED: 'opened',
    CLOSED: 'closed',
};
