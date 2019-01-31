import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

const ADD_MESSAGE_MUTATION = gql`
    mutation ADD_MESSAGE_MUTATION($text: String!, $conversation: ID!) {
        createMessage(text: $text, conversation: $conversation) {
            id
            text
        }
    }
`;

const MessageInput = styled.div`
    height  : 5.5rem;
    padding : 0.5rem 1rem 0;
    input {
        font-size     : 1.2rem;
        width         : 100%;
        height        : 4rem;
        padding       : 1rem;
        border        : 2px solid grey;
        border-radius : 7px;
        &:focus {
            outline      : 0;
            border-color : ${props => props.theme.colorPrimary};
        }
    }
`;

class AddMessage extends Component {
    state = {
        text         : '',
        conversation : ''
    };

    componentWillMount() {
        this.setState({
            conversation : this.props.match.params.id
        });
    }

    render() {
        return (
            <Mutation mutation={ADD_MESSAGE_MUTATION} variables={this.state}>
                {(createMessage, { loading, error }) => (
                    <MessageInput
                        onKeyPress={async e => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                await createMessage();
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
                            onChange     = {e => this.setState({ text: e.target.value })}
                        />
                    </MessageInput>
                )}
            </Mutation>
        );
    }
}

export default AddMessage;
