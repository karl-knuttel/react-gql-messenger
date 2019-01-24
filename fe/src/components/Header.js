import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import HeaderStyles, { Logo } from './styles/Header';
import ConversationLinks from './ConversationLinks';

const Header = () => (
    <HeaderStyles>
        <Logo>
            <Link to="/">Messenger</Link>
        </Logo>

        <ConversationLinks />
    </HeaderStyles>
);

export default withRouter(Header);
