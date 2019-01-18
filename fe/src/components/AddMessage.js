import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ChatInputBox } from './styles/ChatInput';

const ADD_MESSAGE_MUTATION = gql`
    mutation ADD_MESSAGE_MUTATION($text: String!, $conversation: ID!) {
        createMessage(text: $text, conversation: $conversation) {
            id
            text
        }
    }
`;

class AddMessage extends Component {
    state = {
        text        : '',
        conversation: ''
    };

    componentWillMount() {
        // console.log(this.id);
        this.setState({
            conversation: this.props.id
        });
    }

    render() {
        return (
            <Mutation mutation={ADD_MESSAGE_MUTATION} variables={this.state}>
                {(createMessage, { loading, error }) => (
                    // <button
                    //     onClick={async () => {
                    //         await createMessage();
                    //     }}
                    // >
                    //     New Message
                    // </button>
                    <ChatInputBox
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

export default AddMessage;
