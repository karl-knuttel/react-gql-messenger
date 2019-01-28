import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';
import styled from 'styled-components';

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
            users {
                id
            }
        }
    }
`;

const SubmitButton = styled.button`
    background                 : ${props => props.theme.colorPrimary};
    color                      : white;
    text-transform             : uppercase;
    outline                    : none;
    border                     : none;
    border-top-right-radius    : 3px;
    border-bottom-right-radius : 3px;
    padding                    : 1rem 2rem;
    transition                 : background 0.1s ease-in;

    &:hover {
        background : ${props => props.theme.colorPrimaryDark};
        cursor     : pointer;
    }

    &:disabled {
        background : ${props => props.theme.lightGrey};
        &:hover {
            cursor : default;
        }
    }
`;

const checkIfEqual = (a, b) => {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};

class CreateConversation extends React.Component {
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

            if (checkIfEqual(sortedUsers, sortedUsersMatch)) {
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

    render() {
        return (
            <ApolloConsumer>
                {client => (
                    <SubmitButton
                        disabled = {this.props.users.length < 2}
                        onClick  = {() => {
                            this.onButtonClick(this.props.users, client);
                        }}
                    >
                        Create
                    </SubmitButton>
                )}
            </ApolloConsumer>
        );
    }
}

export default withRouter(CreateConversation);
