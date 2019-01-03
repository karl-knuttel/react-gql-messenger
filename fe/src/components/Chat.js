import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ChatInput from './ChatInput';
import { css } from 'glamor';

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

const chatBox = css({
    height   : 'calc(100vh - 14rem)',
    overflowY: 'auto'
});

class Chat extends React.Component {
    scrollToBottom = () => {
        setTimeout(() => {
            this.chatBox.scrollTop = this.chatBox.scrollHeight;
        }, 0);
    };

    render() {
        return (
            <div>
                <div
                    className = {chatBox}
                    ref       = {el => {
                        this.chatBox = el;
                    }}
                >
                    <Query
                        query       = {CURRENT_CHAT_QUERY}
                        fetchPolicy = "network-only"
                    >
                        {({
                            data: { messages },
                            loading,
                            error,
                            subscribeToMore
                        }) => {
                            if (loading) return <p>Loading...</p>;
                            if (error) return <p>Error!!</p>;
                            subscribeToMore({
                                document   : NEW_MESSAGES_SUB,
                                updateQuery: (prev, { subscriptionData }) => {
                                    const newMessage = 
                                        subscriptionData.data.newMessage;
                                    if (
                                        !prev.messages.find(
                                            m => m.id === newMessage.id
                                        )
                                    ) {
                                        return {
                                            ...prev,
                                            messages: [
                                                ...prev.messages,
                                                newMessage
                                            ]
                                        };
                                    }
                                    return prev;
                                }
                            });

                            return (
                                <>
                                    {messages.map(singleMessage => (
                                        <p key={singleMessage.id}>
                                            {singleMessage.text}
                                        </p>
                                    ))}
                                    {this.scrollToBottom()}
                                </>
                            );
                        }}
                    </Query>
                </div>
                <ChatInput />
            </div>
        );
    }
}

export default Chat;
export { CURRENT_CHAT_QUERY };
