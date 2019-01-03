import styled from 'styled-components';

const ChatInputBox = styled.div`
    height : 6rem;
    padding: 2rem 0 0;
    input {
        font-size    : 1.2rem;
        width        : 100%;
        height       : 4rem;
        padding      : 1rem;
        border       : 2px solid grey;
        border-radius: 7px;
        &:focus {
            outline     : 0;
            border-color: ${props => props.theme.colorPrimary};
        }
    }
`;

export { ChatInputBox };
