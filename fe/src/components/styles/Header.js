import styled from 'styled-components';

const HeaderStyles = styled.div`
    padding    : 2rem;
    background : ${props => props.theme.dark};
    height     : 100vh;
    min-width  : 22rem;
`;

const Logo = styled.h1`
    font-family : hkconcentrate_bold;
    position    : relative;
    font-size   : 2rem;
    line-height : 1;
    margin      : 0;
    a {
        color          : white;
        text-transform : uppercase;
    }
`;

export default HeaderStyles;
export { Logo };
