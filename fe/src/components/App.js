import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './Header';
import PageBody from './PageBody';

const theme = {
    black                     : '#002A32',
    white                     : '#ffffff',
    dark                      : '#403F4C',
    colorPrimary              : '#03B5AA',
    colorPrimaryTransparent   : 'rgb(3, 181, 170, 0.05)',
    colorPrimaryDark          : '#01a399',
    colorPrimaryDisabled      : '#bfcccb',
    colorSecondary            : '#fd87e6',
    colorSecondaryTransparent : 'rgb(253, 135, 230, 0.15)',
    colorTertiary             : '#B2B2B2',
    colorTertiaryTransparent  : 'rgb(178,178,178, 0.15)',
    colorOnline               : '#71E591',
    darkGrey                  : '#585858',
    midGrey                   : '#919191',
    midLightGrey              : '#c7c7c7',
    lightGrey                 : '#e3e3e3',
    veryLightGrey             : '#fafafa',
    superLightGrey            : '#FDFDFF',
    maxWidth                  : '1000px'
};

const StyledPage = styled.div`
    background            : white;
    color                 : ${props => props.theme.black};
    display               : grid;
    grid-template-columns : auto 1fr;
`;

const GlobalStyle = createGlobalStyle`
    html {
        box-sizing : border-box;
        font-size  : 10px;
    }
    *, *::before, *::after {
        box-sizing : inherit;
    }
    ::-webkit-scrollbar { 
        width      : 9px;
        background : transparent;
    }
    ::-webkit-scrollbar-thumb {
        background : rgb(3, 181, 170, 0.5);
    }
    ::-webkit-scrollbar-thumb:hover{
        background : ${props => props.theme.colorPrimary};
    }
    body {
        padding        : 0;
        margin         : 0;
        font-size      : 1.4rem;
        line-height    : 2;
        font-family    : 'hkconcentrate_regular';
        letter-spacing : 1.2px;
    }
    h1, h2, h3, h4, h5 {
        font-family : 'hkconcentrate_medium';
        font-weight : normal;
        margin      : 0;
    }
    p {
        margin : 0;
    }
    a {
        text-decoration : none;
        color           : ${theme.black};
    }
`;

const App = props => (
    <ThemeProvider theme={theme}>
        <>
            <GlobalStyle />
            <StyledPage>
                <Header />
                <PageBody />
            </StyledPage>
        </>
    </ThemeProvider>
);

export default App;
