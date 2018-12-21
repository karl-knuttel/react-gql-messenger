import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import Header from './Header';
import Meta from './Meta';

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

injectGlobal`
    @font-face {
        font-family: 'hkconcentrate_regular';
        src        : url('/static/HKConcentrate-Regular.woff2') format('woff2');
        font-weight: normal;
        font-style : normal;
    }
    @font-face {
        font-family: 'hkconcentrate_medium';
        src        : url('/static/HKConcentrate-Medium.woff2') format('woff2');
        font-weight: normal;
        font-style : normal;
    }
    @font-face {
        font-family: 'hkconcentrate_bold';
        src        : url('/static/HKConcentrate-Bold.woff2') format('woff2');
        font-weight: normal;
        font-style : normal;
    }
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

class Page extends Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<StyledPage>
					<Meta />
					<Header />
					<Inner>{this.props.children}</Inner>
				</StyledPage>
			</ThemeProvider>
		);
	}
}

export default Page;
