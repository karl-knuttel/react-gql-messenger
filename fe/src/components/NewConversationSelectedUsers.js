import React from 'react';
import styled from 'styled-components';

const SelectedUsersContainer = styled.div`
    width         : 100%;
    padding       : 1rem;
    border-bottom : 1px solid ${props => props.theme.lightGrey};
`;

const SelectedUser = styled.span`
    padding       : 0.5rem 0.75rem;
    background    : ${props => props.theme.midGrey};
    color         : white;
    border-radius : 3px;
    margin-right  : 0.5rem;
`;

const RemoveButton = styled.button`
    padding       : 0;
    background    : white;
    border        : none;
    outline       : none;
    border-radius : 50%;
    width         : 1.5rem;
    height        : 1.5rem;
    margin-left   : 0.5rem;
    color         : ${props => props.theme.midGrey};
    font-size     : 1.3rem;
    line-height   : 1px;
    transition    : all 0.1s ease-in;

    &:hover {
        transform : scale(1.1);
        color     : ${props => props.theme.darkGrey};
        cursor    : pointer;
    }
`;

const NewConversationSelectedUsers = props => {
    return (
        <SelectedUsersContainer>
            {props.selectedUsers.map((user, index) => (
                <SelectedUser key={index}>
                    {user.id === props.currentUser.id && 'You'}
                    {user.id !== props.currentUser.id && (
                        <>
                            {user.firstname} {user.lastname}
                            <RemoveButton onClick={() => props.removeUser(user)}>
                                &times;
                            </RemoveButton>
                        </>
                    )}
                </SelectedUser>
            ))}
        </SelectedUsersContainer>
    );
};

export default NewConversationSelectedUsers;
