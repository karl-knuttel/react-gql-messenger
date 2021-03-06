import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
// import StyledChatInput from './styles/ChatInput';
import { CURRENT_CHAT_QUERY } from './Chat';

const CREATE_MESSAGE_MUTATION = gql`
    mutation CREATE_MESSAGE_MUTATION($text: String!) {
        createMessage(text: $text) {
            id
        }
    }
`;

const ChatInputBox = styled.div`
    height : 8rem;
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

class ChatInput extends Component {
    state = {
        text: ''
    };

    render() {
        return (
            <Mutation
                mutation       = {CREATE_MESSAGE_MUTATION}
                variables      = {this.state}
                refetchQueries = {[{ query: CURRENT_CHAT_QUERY }]}
            >
                {(createMessage, { loading, error }) => (
                    <ChatInputBox
                        onKeyPress={async e => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                const res = await createMessage();
                                this.setState({ text: '' });
                            }
                        }}
                    >
                        <input
                            name         = "text"
                            type         = "text"
                            autoComplete = "off"
                            placeholder  = "Start typing something"
                            value        = {this.state.text}
                            onChange     = {e =>
                                this.setState({ text: e.target.value })
                            }
                        />
                    </ChatInputBox>
                )}
            </Mutation>
        );
    }
}

export default ChatInput;
