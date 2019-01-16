import React from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';

const CREATE_CONVERSATION_MUTATION = gql`
    mutation CREATE_CONVERSATION_MUTATION($users: [ID!]!) {
        createConversation(users: $users) {
            id
        }
    }
`;

const MATCH_CONVERSATIONS_QUERY = gql`
    query MATCH_CONVERSATIONS_QUERY($users: [ID!]!) {
        conversations(where: { users_every: { id_in: $users } }) {
            id
        }
    }
`;

class CreateConversation extends React.Component {
    onButtonClick = async (users, client) => {
        const res = await client.query({
            query    : MATCH_CONVERSATIONS_QUERY,
            variables: { users }
        });
        if (!res.data.conversations.length) {
            const newConversation = await client.mutate({
                mutation : CREATE_CONVERSATION_MUTATION,
                variables: { users }
            });
            const id = newConversation.data.createConversation.id;
            this.props.history.push(`/conversations/${id}`);
        } else {
            const id = res.data.conversations[0].id;
            this.props.history.push(`/conversations/${id}`);
        }
    };

    onConversationSubmit = async (users, client) => {
        await client.mutate({
            mutation : CREATE_CONVERSATION_MUTATION,
            variables: { users }
        });
    };

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
