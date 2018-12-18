import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const CURRENT_CHAT_QUERY = gql`
    query CURRENT_CHAT_QUERY {
        messages(orderBy: createdAt_ASC) {
            id
            text
        }
    }
`;

const ChatStyles = styled.div`
    height: calc(100vh - 14rem);
    /* background-color: red; */
    overflow-y: auto;
`;

const Chats = () => {
    return (
        <Query query={CURRENT_CHAT_QUERY}>
            {({ data: { messages }, loading, error }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error!!</p>;
                return (
                    <ChatStyles>
                        {messages.map(message => (
                            <p key={message.id}>{message.text}</p>
                        ))}
                    </ChatStyles>
                );
            }}
        </Query>
    );
};

export default Chats;
