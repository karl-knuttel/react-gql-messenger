import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { css } from 'glamor';
import styled from 'styled-components';
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
                    firstname
                    lastname
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
                    firstname
                    lastname
                }
            }
        }
    }
`;

const chatBox = css({
    height    : 'calc(100vh - 14rem)',
    overflowY : 'auto'
});

const MessagesList = styled.ul`
    list-style   : none;
    padding-left : 0;
    max-width    : 60%;
    z-index      : 2;
    color        : white;

    li {
        padding       : 1.5rem 2rem;
        margin-bottom : 1rem;
        background    : ${props => props.theme.colorSecondaryTransparent};
        border        : 1px solid ${props => props.theme.colorSecondary};
        border-radius : 9px;

        h5 {
            letter-spacing : 0.5px;
        }

        p {
            letter-spacing : 0.65px;
        }
    }
`;

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
                                <MessagesList>
                                    {messages.map(message => (
                                        <li key={message.id}>
                                            <h5>
                                                {message.user.firstname} {message.user.lastname}
                                            </h5>
                                            <p>{message.text}</p>
                                        </li>
                                    ))}
                                    {this.scrollToBottom()}
                                </MessagesList>
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
