import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

// const CURRENT_CHAT_QUERY = gql`
//     query CURRENT_CHAT_QUERY($id: ID!) {
//         messages(where: { conversation: { id: $id } }, orderBy: createdAt_ASC) {
//             id
//             text
//             user {
//                 username
//                 firstname
//                 lastname
//             }
//         }
//     }
// `;

const CREATE_MESSAGE_MUTATION = gql`
    mutation CREATE_MESSAGE_MUTATION($text: String!, $conversation: ID!) {
        createMessage(text: $text, conversation: $conversation) {
            id
            text
        }
    }
`;

class Conversation extends Component {
    state = {
        text        : '',
        conversation: ''
    };

    componentWillMount() {
        console.log(this.props.match.params.id);
        this.setState({
            text        : 'It works dude!',
            conversation: this.props.match.params.id
        });
    }

    render() {
        return (
            <Mutation mutation={CREATE_MESSAGE_MUTATION} variables={this.state}>
                {(createMessage, { loading, error }) => (
                    <button
                        onClick={async () => {
                            await createMessage();
                        }}
                    >
                        New Message
                    </button>
                )}
            </Mutation>
        );
    }
}

export default Conversation;
