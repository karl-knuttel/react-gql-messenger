import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const CREATE_CONVERSATION_MUTATION = gql`
    mutation CREATE_CONVERSATION_MUTATION($users: [String!]!) {
        createConversation(users: $users) {
            id
        }
    }
`;

class CreateConversation extends Component {
    state = {
        // users: ['pinksoir', 'imginaliu']
        username1: '',
        username2: '',
        users    : []
    };

    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    createNewConversation = () => {};

    render() {
        return (
            <Mutation
                mutation  = {CREATE_CONVERSATION_MUTATION}
                variables = {this.state}
                // refetchQueries = {[{ query: CURRENT_USER_QUERY }]}
                // onCompleted    = {() => this.props.history.push('/')}
            >
                {(createConversation, { error, loading }) => {
                    return (
                        <>
                            <form
                                method   = "post"
                                onSubmit = {e => {
                                    e.preventDefault();
                                    setTimeout(() => {
                                        this.setState({
                                            users: [
                                                this.state.username1,
                                                this.state.username2
                                            ]
                                        });
                                    }, 0);
                                }}
                            >
                                <fieldset
                                    disabled  = {loading}
                                    aria-busy = {loading}
                                >
                                    <input
                                        type     = "text"
                                        name     = "username1"
                                        value    = {this.state.username1}
                                        onChange = {this.saveToState}
                                    />
                                    <input
                                        type     = "text"
                                        name     = "username2"
                                        value    = {this.state.username2}
                                        onChange = {this.saveToState}
                                    />
                                    <button type="submit">Add Users!</button>
                                </fieldset>
                            </form>
                            <button
                                onClick = {async e => await createConversation()}
                            >
                                Create New Conversation
                            </button>
                        </>
                    );
                }}
            </Mutation>
        );
    }
}

export default CreateConversation;
