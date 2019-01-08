import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import HeaderStyles, { Logo } from './styles/Header';

const Header = () => (
    <HeaderStyles>
        <Logo>
            {/* <a href="/">Messenger</a> */}
            <Link to="/">Messenger</Link>
        </Logo>
        <Link to="/chat/">Chat</Link>
    </HeaderStyles>
);

export default withRouter(Header);
