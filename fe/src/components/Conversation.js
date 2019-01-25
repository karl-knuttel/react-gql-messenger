import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { css } from 'glamor';
import AddMessage from './AddMessage';

const CURRENT_CHAT_QUERY = gql`
    query CURRENT_CHAT_QUERY($id: ID!) {
        conversation(id: $id) {
            id
            messages {
                id
                text
                user {
                    id
                    username
                }
            }
        }
    }
`;

const NEW_MESSAGES_SUB = gql`
    subscription($id: ID!) {
        newMessage(conversationId: $id) {
            node {
                id
                text
                user {
                    id
                    username
                }
            }
        }
    }
`;

const chatBox = css({
    height    : 'calc(100vh - 14rem)',
    overflowY : 'auto'
});

class Conversation extends Component {
    scrollToBottom = () => {
        setTimeout(() => {
            this.chatBox.scrollTop = this.chatBox.scrollHeight;
        }, 0);
    };

    render() {
        const { id } = this.props.match.params;
        return (
            <div>
                <div
                    className = {chatBox}
                    ref       = {el => {
                        this.chatBox = el;
                    }}
                >
                    <Query query={CURRENT_CHAT_QUERY} variables={{ id }} fetchPolicy="network-only">
                        {({ data: { conversation }, loading, error, subscribeToMore }) => {
                            if (loading) return <p>Loading...</p>;
                            if (error) return <p>Error!!</p>;
                            subscribeToMore({
                                document    : NEW_MESSAGES_SUB,
                                variables   : { id },
                                updateQuery : (prev, { subscriptionData }) => {
                                    const newMessage = subscriptionData.data.newMessage.node;

                                    if (
                                        !prev.conversation.messages.find(
                                            m => m.id === newMessage.id
                                        )
                                    ) {
                                        return {
                                            ...prev,
                                            conversation: {
                                                __typename : prev.conversation.__typename,

                                                id : prev.conversation.id,

                                                messages: [
                                                    ...prev.conversation.messages,
                                                    newMessage
                                                ]
                                            }
                                        };
                                    }
                                    return prev;
                                }
                            });

                            const { messages } = conversation;
                            return (
                                <>
                                    {messages.map(message => (
                                        <p key={message.id}>{message.text}</p>
                                    ))}
                                    {this.scrollToBottom()}
                                </>
                            );
                        }}
                    </Query>
                </div>
                <AddMessage id={id} />
            </div>
        );
    }
}

export default Conversation;
