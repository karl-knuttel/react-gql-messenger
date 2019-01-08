import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './Header';
import TitleBar from '../components/TitleBar';
import Chat from '../components/Chat';
import Signup from './Signup';

const theme = {
    black         : '#002A32',
    dark          : '#403F4C',
    colorPrimary  : '#03B5AA',
    superLightGrey: '#FDFDFF',
    maxWidth      : '1000px'
};

const StyledPage = styled.div`
    background           : white;
    color                : ${props => props.theme.black};
    display              : grid;
    grid-template-columns: auto 1fr;
`;

const Inner = styled.main`
    max-width       : ${props => props.theme.maxWidth};
    padding         : 2rem;
    position        : relative;
    background-color: ${props => props.theme.superLightGrey};
`;

const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
        font-size : 10px;
    }
    *, *::before, *::after {
        box-sizing: inherit;
    }
    body {
        padding    : 0;
        margin     : 0;
        font-size  : 1.5rem;
        line-height: 2;
        font-family: 'hkconcentrate_regular';
    }
    h1, h2, h3, h4, h5 {
        font-family: 'hkconcentrate_medium';
        margin     : 0;
    }
    p {
        margin: 0;
    }
    a {
        text-decoration: none;
        color          : ${theme.black};
    }
`;

const NotFound = () => <h1>Oops. That page doesn't exist!</h1>;

const App = props => (
    <ThemeProvider theme={theme}>
        <StyledPage>
            <GlobalStyle />
            <Header />
            <Inner>
                <TitleBar />
                {/* <Chat /> */}
                {/* <Signup />
                <Signup /> */}
                <Switch>
                    <Route path="/chat/:id" component={Chat} />
                    <Route exact path="/login" component={Signup} />
                    <Route component={NotFound} />
                </Switch>
            </Inner>
        </StyledPage>
    </ThemeProvider>
);

export default App;
