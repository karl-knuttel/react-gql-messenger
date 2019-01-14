import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import User from './User';
import TitleBar from './TitleBar';
import Chat from './Chat';
import Login from './Login';
import CreateConversation from './CreateConversation';
import NewConversation from './NewConversation';

const PageBodyStyles = styled.main`
    max-width       : ${props => props.theme.maxWidth};
    padding         : 2rem;
    position        : relative;
    background-color: ${props => props.theme.superLightGrey};
`;

const NotFound = () => <h1>Oops. That page doesn't exist!</h1>;

const PageBody = () => (
    <PageBodyStyles>
        {/* <User>
            {({ data: { me } }) => (
                <>
                    <TitleBar />
                    {me && (
                        <Switch>
                            <Route path="/" component={Chat} />
                            <Route path="/chat/:id" component={Chat} />
                            <Route component={NotFound} />
                        </Switch>
                    )}
                    {!me && <Login />}
                </>
            )}
        </User> */}
        {/* <CreateConversation /> */}
        <NewConversation />
    </PageBodyStyles>
);

export default PageBody;
