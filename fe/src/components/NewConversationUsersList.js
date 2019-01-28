import React from 'react';
import styled from 'styled-components';

const UsersList = styled.ul`
    list-style    : none;
    margin-top    : 2rem;
    padding-left  : 0;
    margin-right  : 8rem;
    height        : calc(100vh - 15rem);
    overflow      : auto;
    margin-bottom : 0;

    li {
        margin-left     : 0;
        padding         : 1rem;
        border          : 1px solid ${props => props.theme.superLightGrey};
        border-top      : 1px solid ${props => props.theme.lightGrey};
        display         : flex;
        justify-content : space-between;
        align-items     : center;
        border-radius   : 1px;

        &:hover {
            background : ${props => props.theme.colorPrimaryTransparent};
            border     : 1px solid ${props => props.theme.colorPrimary};
        }
    }

    button {
        outline       : none;
        border        : none;
        background    : ${props => props.theme.colorPrimary};
        color         : ${props => props.theme.white};
        border-radius : 50%;
        font-size     : 1rem;
        height        : 3rem;
        width         : 3rem;
        transition    : background 0.1s ease-in;

        &:disabled {
            background : ${props => props.theme.lightGrey};

            &:hover {
                cursor     : default;
                background : ${props => props.theme.lightGrey};
            }
        }

        &:hover {
            cursor     : pointer;
            background : ${props => props.theme.colorPrimaryDark};
        }
    }
`;

const NewConversationUsersList = props => {
    return (
        <UsersList>
            {props.users.map(user => (
                <li
                    key     = {user.id}
                    onClick = {
                        !props.selectedUsers.some(item => user.id === item.id)
                            ? () => props.addUser(user)
                             :  null
                    }
                >
                    {user.firstname} {user.lastname} ({user.username})
                    <button
                        onClick  = {() => props.addUser(user)}
                        disabled = {props.selectedUsers.some(item => user.id === item.id)}
                    >
                        +
                    </button>
                </li>
            ))}
        </UsersList>
    );
};

export default NewConversationUsersList;
