import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { css } from 'glamor';
import User from './User';
import styled from 'styled-components';

const ALL_CONVERSATIONS_QUERY = gql`
    query ALL_CONVERSATIONS_QUERY {
        conversations {
            id
            users {
                id
                firstname
                lastname
            }
        }
    }
`;

// const conversationsList = css({
//     color      : 'white',
//     listStyle  : 'none',
//     paddingLeft: 0
// });

const conversationListItem = css({
    lineHeight: 1.6
});

const conversationListItemLink = css({
    color: 'white'
});

const ConversationsList = styled.ul`
    list-style  : none;
    padding-left: 0;

    li {
        line-height: 2;

        a {
            color: white;

            span {
                &::after {
                    content : ', ';
                    position: relative;
                    right   : 0;
                    top     : 0;
                    height  : 100%;
                }
            }
        }
    }
`;

const ConversationLinks = () => {
    return (
        <User>
            {({ data: { me }, loading }) => {
                if (loading) return <p>Loading...</p>;
                return (
                    <Query query={ALL_CONVERSATIONS_QUERY}>
                        {({ data: { conversations }, loading, error }) => {
                            if (loading) return <p>Loading...</p>;
                            if (error) return <p>Error!!</p>;
                            return (
                                <div>
                                    <div>
                                        <h4>Conversations</h4>
                                        <Link to={'/newconversation'}>
                                            <span>+</span>
                                        </Link>
                                    </div>
                                    <ConversationsList>
                                        {conversations.map(conversation => (
                                            <li key={conversation.id}>
                                                <Link to={`/conversations/${conversation.id}`}>
                                                    {conversation.users.map(user => {
                                                        if (user.id !== me.id) {
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
                        }}
                    </Query>
                );
            }}
        </User>
    );
};

export default ConversationLinks;
