import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';

const CREATE_CONVERSATION_MUTATION = gql`
    mutation CREATE_CONVERSATION_MUTATION($users: [ID!]!) {
        createConversation(users: $users) {
            id
        }
    }
`;

// const MATCH_CONVERSATIONS_QUERY = gql`
//     query MATCH_CONVERSATIONS_QUERY($users: [ID!]!) {
//         conversations(
//             where : { users_every: { id_in: $users }, users_none: { id_not_in: $users } }
//         ) {
//             id
//             users {
//                 id
//             }
//         }
//     }
// `;

const MATCH_CONVERSATIONS_QUERY = gql`
    query MATCH_CONVERSATIONS_QUERY($users: [ID!]!) {
        conversations(where: { users_every: { id_in: $users } }) {
            id
            users {
                id
            }
        }
    }
`;

class CreateConversation extends React.Component {
    checkIfEqual = (a, b) => {
        if (a.length !== b.length) return false;

        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    };

    onButtonClick = async (users, client) => {
        const res = await client.query({
            query     : MATCH_CONVERSATIONS_QUERY,
            variables : { users }
        });

        const sortedUsers = users.sort();
        let   id          = 0;

        res.data.conversations.forEach(conversation => {
            let usersMatch = [];

            for (let i = 0; i < conversation.users.length; i++) {
                usersMatch.push(conversation.users[i].id);
            }

            let sortedUsersMatch = usersMatch.sort();

            if (this.checkIfEqual(sortedUsers, sortedUsersMatch)) {
                id = conversation.id;
                return id;
            }

            return id;
        });

        if (id !== 0) {
            this.props.history.push(`/conversations/${id}`);
        } else {
            const newConversation = await client.mutate({
                mutation  : CREATE_CONVERSATION_MUTATION,
                variables : { users }
            });
            const newId = newConversation.data.createConversation.id;
            this.props.history.push(`/conversations/${newId}`);
        }
    };

    // onConversationSubmit = async (users, client) => {
    //     await client.mutate({
    //         mutation  : CREATE_CONVERSATION_MUTATION,
    //         variables : { users }
    //     });
    // };

    render() {
        return (
            <ApolloConsumer>
                {client => (
                    <button
                        disabled = {this.props.users.length < 2}
                        onClick  = {() => {
                            this.onButtonClick(this.props.users, client);
                        }}
                    >
                        Create new conversation
                    </button>
                )}
            </ApolloConsumer>
        );
    }
}

export default withRouter(CreateConversation);
