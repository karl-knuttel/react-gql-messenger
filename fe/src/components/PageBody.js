import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import User from './User';
// import TitleBar from './TitleBar';
import Login from './Login';
import Conversation from './Conversation';
import NewConversation from './NewConversation';

const PageBodyStyles = styled.main`
    max-width      : ${props => props.theme.maxWidth};
    padding        : 2rem;
    padding-bottom : 0;
    position       : relative;
    background     : linear-gradient(0deg, rgba(76, 75, 90, 0.95), rgba(76, 75, 90, 0.95)),
        url('../img/80s-pattern-2.jpg') repeat left top;
    background-size : 35%;
    /* box-shadow      : 1px 0 1px 0 rgba(0, 0, 0, 0.15) inset; */
`;

const NotFound = () => <h1>Oops. That page doesn't exist!</h1>;

const UPDATE_USER_ACTIVITY_MUTATION = gql`
    mutation UPDATE_USER_ACTIVITY_MUTATION($id: ID!, $now: DateTime!) {
        updateUserActivity(id: $id, lastActivity: $now) {
            id
            lastActivity
        }
    }
`;

class ContainerComponent extends React.Component {
    componentDidMount() {
        this.props.updateUserActivity();
        const that = this;
        setInterval(function() {
            // console.log(that.props);
            that.props.updateUserActivity();
        }, 30000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return <div>{this.props.children}</div>;
    }
}

// const PageBody = () => (

class PageBody extends React.Component {
    state = {
        now : new Date().toISOString()
    };

    tick() {
        this.setState({
            now : new Date().toISOString()
        });
        // console.log(this.state.now);
    }

    componentWillMount() {
        this.setNewDate = setInterval(() => this.tick(), 30000);
    }

    componentWillUnmount() {
        clearInterval(this.setNewdate);
    }

    render() {
        return (
            <PageBodyStyles>
                <User>
                    {({ data: { me }, loading }) => (
                        <>
                            {loading && <p>Loading...</p>}
                            {me && (
                                <Mutation
                                    mutation  = {UPDATE_USER_ACTIVITY_MUTATION}
                                    variables = {{ id: me.id, now: this.state.now }}
                                >
                                    {(updateUserActivity, { data, loading, error }) => (
                                        <ContainerComponent updateUserActivity={updateUserActivity}>
                                            <Switch>
                                                <Route exact path="/" component={NotFound} />
                                                <Route
                                                    path   = "/newconversation"
                                                    render = {props => (
                                                        <NewConversation
                                                            {...props}
                                                            currentUser = {me}
                                                        />
                                                    )}
                                                />
                                                <Route
                                                    path      = "/conversations/:id"
                                                    component = {Conversation}
                                                />
                                                <Route component={NotFound} />
                                            </Switch>
                                        </ContainerComponent>
                                    )}
                                </Mutation>
                            )}
                            {!me && !loading && <Login />}
                        </>
                    )}
                </User>
            </PageBodyStyles>
        );
    }
}
// );

export default PageBody;
