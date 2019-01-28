import React from 'react';
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';
import debounce from 'lodash.debounce';
import NewConversationUsersList from './NewConversationUsersList';
import NewConversationSelectedUsers from './NewConversationSelectedUsers';
import NewConversationSubmit from './NewConversationSubmit';
import styled from 'styled-components';

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

const CreateContainer = styled.div`
    display : flex;
`;

const SearchInput = styled.input`
    width         : calc(100% - 8rem);
    padding       : 1rem;
    margin-top    : 2rem;
    height        : auto;
    border        : 1px solid ${props => props.theme.midLightGrey};
    border-radius : 3px;
    outline       : none;
    font-size     : 1.4rem;
    background    : ${props => props.theme.veryLightGrey};
    box-shadow    : 0 0 0 0 rgba(0, 0, 0, 0);
    transition    : all 0.125s ease-out;

    &:focus {
        border     : 1px solid ${props => props.theme.colorPrimary};
        transform  : translate3d(0, -2px, 0) scale(1.005);
        box-shadow : 2px 2px 3px 1px rgba(0, 0, 0, 0.05);
        background : ${props => props.theme.white};
    }
`;

class NewConversation extends React.Component {
    state = {
        loading       : false,
        users         : [],
        selectedUsers : []
    };

    onChange = debounce(async (e, client) => {
        this.setState({ loading: true });

        const res = await client.query({
            query     : SEARCH_USERS_QUERY,
            variables : { searchTerm: e.target.value }
        });

        this.setState({
            users   : res.data.users,
            loading : false
        });
    }, 350);

    addUser = user => {
        const { id, firstname, lastname, username } = user;
        this.setState({
            selectedUsers : [...this.state.selectedUsers, { id, firstname, lastname, username }]
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
            selectedUsers : [{ id, firstname, lastname, username }]
        });
    }

    render() {
        return (
            <div>
                <CreateContainer>
                    <NewConversationSelectedUsers
                        selectedUsers = {this.state.selectedUsers}
                        currentUser   = {this.props.currentUser}
                        removeUser    = {this.removeUser}
                    />
                    <NewConversationSubmit
                        users={this.state.selectedUsers.map(user => {
                            return user.id;
                        })}
                    />
                </CreateContainer>

                <ApolloConsumer>
                    {client => (
                        <SearchInput
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
