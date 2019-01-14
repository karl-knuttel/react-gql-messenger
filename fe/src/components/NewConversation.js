import React from 'react';
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';
import debounce from 'lodash.debounce';

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

    addUser = username => {
        this.setState({
            selectedUsers: [...this.state.selectedUsers, username]
        });
    };

    render() {
        return (
            <div>
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

                <div>
                    {this.state.users.map(user => (
                        <div key={user.id}>
                            {user.firstname} {user.lastname} ({user.username})
                            {/* <button onClick={() => this.addUser(user.username)}> */}
                            {!this.state.selectedUsers.indexOf(user.username) >
                                -1 && (
                                <button
                                    onClick={() =>
                                        this.setState({
                                            selectedUsers: [
                                                ...this.state.selectedUsers,
                                                user.username
                                            ]
                                        })
                                    }
                                >
                                    Add User
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default NewConversation;
