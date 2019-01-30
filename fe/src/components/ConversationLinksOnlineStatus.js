import React, { Component } from 'react';
import gql from 'graphql-tag';
// import { Query } from 'react-apollo';
import { ApolloConsumer } from 'react-apollo';

const USERS_ONLINE_QUERY = gql`
    query USERS_ONLINE_QUERY($userIds: [ID!]!) {
        users(where: { id_in: $userIds }) {
            id
            lastActivity
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

        users.forEach(user => {
            if (user.id !== this.props.currentUserId) {
                const lastOnline = this.checkLastUserActivity(user.lastActivity);
                console.log('User ', user.id, 'was last online', lastOnline, 'seconds ago');

                if (lastOnline < 60000) {
                    this.setState({
                        online : true
                    });
                    console.log('Online!');
                } else {
                    this.setState({
                        online : false
                    });
                    console.log('Offline!!');
                }
            }
        });
    }

    componentDidMount() {
        this.checkUsersStatus();
        // const that = this;
        // setInterval(function() {
        //     that.checkUsersStatus();
        // }, 3000);
    }

    componentDidUpdate(nextProps) {
        // console.log(nextProps);
    }

    render() {
        return (
            this.state.users && (
                <div>
                    {this.state.users.map(user => {
                        if (user.id === this.props.currentUserId) {
                            return (
                                <p key={user.id}>
                                    {user.id} {user.lastActivity}
                                </p>
                            );
                        }
                        return null;
                    })}
                </div>
            )
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
