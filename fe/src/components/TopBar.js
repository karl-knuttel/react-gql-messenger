import React from 'react';
import styled from 'styled-components';

const StyledTopBar = styled.div`
    height        : 6rem;
    padding       : 1rem;
    background    : ${props => props.theme.dark2};
    color         : ${props => props.theme.superLightGrey};
    margin-bottom : 0.5rem;
    border-bottom : 2px solid ${props => props.theme.dark};
`;

const TopBar = props => {
    return (
        <StyledTopBar>
            <p>I'm the top bar thing</p>
        </StyledTopBar>
    );
};

export default TopBar;
