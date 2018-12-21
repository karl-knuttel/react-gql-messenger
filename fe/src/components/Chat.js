import React from 'react';
import styled from 'styled-components';
import { Query, Subscription } from 'react-apollo';
import gql from 'graphql-tag';
import ChatInput from './ChatInput';

const CURRENT_CHAT_QUERY = gql`
    query CURRENT_CHAT_QUERY {
        messages(orderBy: createdAt_ASC) {
            id
            text
        }
    }
`;

const NEW_MESSAGES_SUB = gql`
    subscription {
        newMessage {
            id
            text
        }
    }
`;

const ChatStyles = styled.div`
    height    : calc(100vh - 14rem);
    overflow-y: auto;
`;

const Chat = () => {
    return (
        <>
            <Query query={CURRENT_CHAT_QUERY}>
                {({ data: { messages }, loading, error, subscribeToMore }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error!!</p>;
                    subscribeToMore({
                        document   : NEW_MESSAGES_SUB,
                        updateQuery: (prev, { subscriptionData }) => {
                            console.log('prev: ', prev);
                            console.log('subscriptionData: ', subscriptionData);
                            if (!subscriptionData) return prev;

                            return {
                                ...prev,
                                messages: [
                                    ...prev.messages,
                                    subscriptionData.data.newMessage
                                ]
                            };
                        }
                    });

                    return (
                        <ChatStyles>
                            {messages.map(singleMessage => (
                                <p key={singleMessage.id}>
                                    {singleMessage.text}
                                </p>
                            ))}
                        </ChatStyles>
                    );
                }}
            </Query>
            {/* <Subscription subscription={NEW_MESSAGES_SUB}>
                {data => {
                    console.log(data);
                    return null;
                }}
            </Subscription> */}
            <ChatInput />
        </>
    );
};

export default Chat;
export { CURRENT_CHAT_QUERY };
