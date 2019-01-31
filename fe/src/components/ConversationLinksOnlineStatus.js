import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import CheckUsers from './ConversationLinksCheckUsers';

const ConversationLinksOnlineStatus = props => {
    const userIds = [];
    props.users.forEach(user => {
        userIds.push(user.id);
    });

    return (
        <ApolloConsumer>
            {client => (
                <CheckUsers
                    accessClient  = {client}
                    userIds       = {userIds}
                    currentUserId = {props.currentUserId}
                />
            )}
        </ApolloConsumer>
    );
};

export default ConversationLinksOnlineStatus;
