import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { css } from 'glamor';
import User, { CURRENT_USER_QUERY } from './User';
import styled from 'styled-components';

const ALL_CONVERSATIONS_QUERY = gql`
    query ALL_CONVERSATIONS_QUERY($userId: ID!) {
        conversations(where: { users_some: { id: $userId } }) {
            id
            users {
                id
                firstname
                lastname
            }
        }
    }
`;

const NEW_CONVERSATION_SUB = gql`
    subscription($userId: ID!) {
        newConversation(userId: $userId) {
            node {
                id
                users {
                    id
                    firstname
                    lastname
                    username
                }
            }
        }
    }
`;

const ConversationsListHeader = styled.div`
    display         : flex;
    flex-direction  : row;
    justify-content : space-between;
    color           : #e3e3e3;
    margin-top      : 10rem;

    h4 {
        font-size   : 1.5rem;
        font-weight : 400;
    }

    /* a {
        color : white;
    } */

    span {
        position    : relative;
        font-weight : 600;
        color       : grey;
        transition  : color 0.1s ease-in;

        &::before {
            content       : '';
            position      : absolute;
            width         : 1.8rem;
            height        : 1.8rem;
            border        : 2px solid grey;
            border-radius : 50%;
            top           : 0;
            left          : 0;
            transform     : translate3d(-25%, 0, 0);
            transition    : border-color 0.1s ease-in;
        }

        &:hover {
            color : #e3e3e3;

            &::before {
                border-color : #e3e3e3;
            }
        }
    }
`;

const ConversationsList = styled.ul`
    list-style   : none;
    padding-left : 0;

    li {
        line-height  : 1.8;
        width        : calc(100% + 4rem);
        margin-left  : -2rem;
        padding-left : 2rem;

        &.isActive {
            background : ${props => props.theme.colorPrimary};
        }

        a {
            color : white;

            span {
                &:not(:last-child)::after {
                    content  : ', ';
                    position : relative;
                    right    : 0;
                    top      : 0;
                    height   : 100%;
                }
            }
        }
    }
`;

const ConversationLinks = props => (
    <Query query={CURRENT_USER_QUERY}>
        {({ data, loading }) => {
            if (!data.me) {
                return null;
            }
            if (loading) return <p>Loading...</p>;
            const userId = data.me.id;
            const path   = props.location.pathname.split('/')[2];

            console.log(path);

            return (
                <Query
                    query       = {ALL_CONVERSATIONS_QUERY}
                    variables   = {{ userId }}
                    fetchPolicy = "network-only"
                >
                    {({ data: { conversations }, loading, error, subscribeToMore }) => {
                        if (loading) return <p>Loading...</p>;

                        subscribeToMore({
                            document    : NEW_CONVERSATION_SUB,
                            variables   : { userId },
                            updateQuery : (prev, { subscriptionData }) => {
                                const newConversation = subscriptionData.data.newConversation.node;

                                if (
                                    !prev.conversations.find(
                                        conversation => conversation.id === newConversation.id
                                    )
                                ) {
                                    return {
                                        ...prev,
                                        conversations : [...prev.conversations, newConversation]
                                    };
                                }
                                return prev;
                            }
                        });

                        return (
                            <div>
                                <ConversationsListHeader>
                                    <h4>Conversations</h4>
                                    <Link to={'/newconversation'}>
                                        <span>+</span>
                                    </Link>
                                </ConversationsListHeader>
                                <ConversationsList>
                                    {conversations.map(conversation => (
                                        <li
                                            key       = {conversation.id}
                                            className = {conversation.id === path ? 'isActive' : ''}
                                        >
                                            <Link to={`/conversations/${conversation.id}`}>
                                                {conversation.users.map(user => {
                                                    if (user.id !== userId) {
                                                        return (
                                                            <span key={user.id}>
                                                                {user.firstname} {user.lastname}
                                                            </span>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </Link>
                                        </li>
                                    ))}
                                </ConversationsList>
                            </div>
                        );
                        return null;
                    }}
                </Query>
            );
        }}
    </Query>
);

export default ConversationLinks;
export { ALL_CONVERSATIONS_QUERY };
