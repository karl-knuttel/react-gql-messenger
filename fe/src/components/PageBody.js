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
            lastActivity
        }
    }
`;

const UpdateUserActivity = props => (
    <Mutation mutation={UPDATE_USER_ACTIVITY_MUTATION} variables={props.id}>
        {(updateUserActivity, { data, loading, error }) => (
            <ContainerComponent updateUserActivity />
        )}
    </Mutation>
);

class ContainerComponent extends React.Component {
    componentDidMount() {
        // setInterval(this.props.updateUserActivity(), 1000 * 60 * 60 * 3);
        console.log(this.props);
        // this.props.updateUserActivity();
    }

    render() {
        return <div>{this.props.children}</div>;
    }
}

const PageBody = () => (
    <PageBodyStyles>
        <User>
            {({ data: { me }, loading }) => (
                <>
                    {loading && <p>Loading...</p>}
                    {me && (
                        <Mutation mutation={UPDATE_USER_ACTIVITY_MUTATION} variables={{ me }}>
                            {(updateUserActivity, { data, loading, error }) => (
                                <ContainerComponent
                                    id  = {me.id}
                                    now = {new Date().toISOString()}
                                    updateUserActivity
                                >
                                    <Switch>
                                        <Route exact path="/" component={NotFound} />
                                        <Route
                                            path   = "/newconversation"
                                            render = {props => (
                                                <NewConversation {...props} currentUser={me} />
                                            )}
                                        />
                                        <Route path="/conversations/:id" component={Conversation} />
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

export default PageBody;
