import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';

const CREATE_CONVERSATION_MUTATION = gql`
    mutation CREATE_CONVERSATION_MUTATION($users: [ID!]!) {
        createConversation(users: $users) {
            id
        }
    }
`;

const CreateConversation = props => {
    return (
        <Mutation
            mutation  = {CREATE_CONVERSATION_MUTATION}
            variables = {props}
            // refetchQueries = {[{ query: CURRENT_USER_QUERY }]}
            onCompleted = {() => props.history.push('/conversations')}
        >
            {(createConversation, { error, loading }) => {
                return (
                    <button
                        disabled = {props.users.length < 2}
                        onClick  = {async e => await createConversation()}
                    >
                        Create new conversation
                    </button>
                );
            }}
        </Mutation>
    );
};

export default withRouter(CreateConversation);
