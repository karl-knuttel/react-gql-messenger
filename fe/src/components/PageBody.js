import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import User from './User';
// import TitleBar from './TitleBar';
import Login from './Login';
import Conversation from './Conversation';
import NewConversation from './NewConversation';

const PageBodyStyles = styled.main`
    max-width        : ${props => props.theme.maxWidth};
    padding          : 2rem;
    position         : relative;
    background-color : ${props => props.theme.superLightGrey};
`;

const NotFound = () => <h1>Oops. That page doesn't exist!</h1>;

const PageBody = () => (
    <PageBodyStyles>
        <User>
            {({ data: { me }, loading }) => (
                <>
                    {loading && <p>Loading...</p>}
                    {me && (
                        <Switch>
                            <Route exact path="/" component={NotFound} />
                            <Route
                                path   = "/newconversation"
                                render = {props => <NewConversation {...props} currentUser={me} />}
                            />
                            <Route path="/conversations/:id" component={Conversation} />
                            <Route component={NotFound} />
                        </Switch>
                    )}
                    {!me && !loading && <Login />}
                </>
            )}
        </User>
    </PageBodyStyles>
);

export default PageBody;
