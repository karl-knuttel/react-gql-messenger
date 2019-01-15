import React from 'react';
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';
import debounce from 'lodash.debounce';
import NewConversationUsersList from './NewConversationUsersList';
import NewConversationSelectedUsers from './NewConversationSelectedUsers';
import NewConversationSubmit from './NewConversationSubmit';

const SEARCH_USERS_QUERY = gql`
    query SEARCH_USERS_QUERY($searchTerm: String!) {
        users(
            where: {
                OR: [
                    { username_contains: $searchTerm }
                    { firstname_contains: $searchTerm }
                    { lastname_contains: $searchTerm }
                ]
            }
        ) {
            id
            username
            firstname
            lastname
        }
    }
`;

class NewConversation extends React.Component {
    state = {
        loading      : false,
        users        : [],
        selectedUsers: []
    };

    onChange = debounce(async (e, client) => {
        this.setState({ loading: true });

        const res = await client.query({
            query    : SEARCH_USERS_QUERY,
            variables: { searchTerm: e.target.value }
        });

        this.setState({
            users  : res.data.users,
            loading: false
        });
    }, 350);

    addUser = user => {
        const { id, firstname, lastname, username } = user;
        this.setState({
            selectedUsers: [
                ...this.state.selectedUsers,
                { id, firstname, lastname, username }
            ]
        });
    };

    removeUser = user => {
        let array = [...this.state.selectedUsers];
        let index = array.indexOf(user);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ selectedUsers: array });
        }
    };

    componentWillMount() {
        const { id, firstname, lastname, username } = this.props.currentUser;
        this.setState({
            selectedUsers: [{ id, firstname, lastname, username }]
        });
    }

    render() {
        return (
            <div>
                <div>
                    <NewConversationSelectedUsers
                        selectedUsers = {this.state.selectedUsers}
                        currentUser   = {this.props.currentUser}
                        removeUser    = {this.removeUser}
                    />
                    {/* {this.state.selectedUsers.length > 1 && ( */}
                    <NewConversationSubmit
                        users={this.state.selectedUsers.map(user => {
                            return user.id;
                        })}
                    />
                    {/* )} */}
                </div>

                <ApolloConsumer>
                    {client => (
                        <input
                            type        = "search"
                            placeholder = "Search for users to add to chat"
                            onChange    = {e => {
                                e.persist();
                                this.onChange(e, client);
                            }}
                        />
                    )}
                </ApolloConsumer>

                <NewConversationUsersList
                    users         = {this.state.users}
                    selectedUsers = {this.state.selectedUsers}
                    addUser       = {this.addUser}
                />
            </div>
        );
    }
}

export default NewConversation;
