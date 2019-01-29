import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
// import Form from './styles/Form';
// import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION(
        $email        : String!
        $firstname    : String!
        $lastname     : String!
        $password     : String!
        $username     : String!
        $lastActivity : DateTime!
    ) {
        signup(
            email        : $email
            firstname    : $firstname
            lastname     : $lastname
            password     : $password
            username     : $username
            lastActivity : $lastActivity
        ) {
            id
            email
            firstname
            username
        }
    }
`;

class Signup extends Component {
    state = {
        email        : '',
        firstname    : '',
        lastname     : '',
        password     : '',
        username     : '',
        lastActivity : ''
    };

    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value });
        let now = new Date().toISOString();
        this.setState({ lastActivity: now });
    };

    render() {
        return (
            <Mutation
                mutation       = {SIGNUP_MUTATION}
                variables      = {this.state}
                refetchQueries = {[{ query: CURRENT_USER_QUERY }]}
                onCompleted    = {() => this.props.history.push('/')}
            >
                {(signup, { error, loading }) => {
                    return (
                        <form
                            method   = "post"
                            onSubmit = {async e => {
                                e.preventDefault();
                                await signup();
                                this.setState({
                                    email     : '',
                                    firstname : '',
                                    lastname  : '',
                                    password  : '',
                                    username  : ''
                                });
                            }}
                        >
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Sign Up for an account</h2>
                                {/* <Error error={error} /> */}
                                <label htmlFor="firstname">
                                    First Name
                                    <input
                                        type        = "text"
                                        name        = "firstname"
                                        placeholder = "First Name"
                                        value       = {this.state.firstname}
                                        onChange    = {this.saveToState}
                                    />
                                </label>
                                <label htmlFor="lastname">
                                    Last Name
                                    <input
                                        type        = "text"
                                        name        = "lastname"
                                        placeholder = "Last Name"
                                        value       = {this.state.lastname}
                                        onChange    = {this.saveToState}
                                    />
                                </label>
                                <label htmlFor="username">
                                    Choose a username
                                    <input
                                        type        = "text"
                                        name        = "username"
                                        placeholder = "Username"
                                        value       = {this.state.username}
                                        onChange    = {this.saveToState}
                                    />
                                </label>
                                <label htmlFor="email">
                                    Email
                                    <input
                                        type        = "email"
                                        name        = "email"
                                        placeholder = "email"
                                        value       = {this.state.email}
                                        onChange    = {this.saveToState}
                                    />
                                </label>
                                <label htmlFor="password">
                                    Password
                                    <input
                                        type        = "password"
                                        name        = "password"
                                        placeholder = "password"
                                        value       = {this.state.password}
                                        onChange    = {this.saveToState}
                                    />
                                </label>
                                <button type="submit">Sign Up!</button>
                            </fieldset>
                        </form>
                    );
                }}
            </Mutation>
        );
    }
}

export default withRouter(Signup);
