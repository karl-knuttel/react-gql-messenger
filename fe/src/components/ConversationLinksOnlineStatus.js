import React, { Component } from 'react';
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';
import styled from 'styled-components';

const USERS_ONLINE_QUERY = gql`
    query USERS_ONLINE_QUERY($userIds: [ID!]!) {
        users(where: { id_in: $userIds }) {
            id
            lastActivity
        }
    }
`;

const OnlineNotification = styled.div`
    margin-right : 1rem;

    .notification {
        height        : 11px;
        width         : 11px;
        border-radius : 50%;

        &.offline {
            background-color : grey;
        }

        &.online {
            /* background-color : green; */
            background-color : ${props => props.theme.colorOnline};
        }
    }
`;

class CheckUsers extends Component {
    state = {
        users  : [],
        online : false
    };

    checkLastUserActivity(userActivity) {
        const now  = new Date();
        const temp = new Date(userActivity);

        const latestActivity = now.getTime() - temp.getTime();
        // console.log(latestActivity);
        return latestActivity;
    }

    async checkUsersStatus() {
        const res = await this.props.accessClient.query({
            query     : USERS_ONLINE_QUERY,
            variables : { userIds: this.props.userIds }
        });

        this.setState({
            users : res.data.users
        });

        const users = res.data.users;
        // console.log(users);
        const usersOnlineNow = [];

        users.forEach(user => {
            if (user.id !== this.props.currentUserId) {
                const lastOnline = this.checkLastUserActivity(user.lastActivity);
                // console.log('User ', user.id, 'was last online', lastOnline / 1000, 'seconds ago');

                if (lastOnline < 30000) {
                    usersOnlineNow.push(user.id);
                } else {
                    let index = usersOnlineNow.indexOf(user.id);
                    if (index !== -1) {
                        usersOnlineNow.splice(index, 1);
                    }
                }
            }
        });

        if (usersOnlineNow.length > 0) {
            this.setState({
                online : true
            });
        } else {
            this.setState({
                online : false
            });
        }
    }

    componentDidMount() {
        this.checkUsersStatus();
        const that = this;
        setInterval(function() {
            that.checkUsersStatus();
        }, 30000);
    }

    render() {
        return (
            <OnlineNotification>
                {this.state.online ? (
                    <div className="notification online" />
                ) : (
                    <div className="notification offline" />
                )}
            </OnlineNotification>
        );
    }
}

class ConversationLinksOnlineStatus extends Component {
    render() {
        const userIds = [];
        this.props.users.forEach(user => {
            userIds.push(user.id);
        });

        return (
            <ApolloConsumer>
                {client => (
                    <CheckUsers
                        accessClient  = {client}
                        userIds       = {userIds}
                        currentUserId = {this.props.currentUserId}
                    />
                )}
            </ApolloConsumer>
        );
    }
}

export default ConversationLinksOnlineStatus;
