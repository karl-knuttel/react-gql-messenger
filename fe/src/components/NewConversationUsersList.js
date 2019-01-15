import React from 'react';

const NewConversationUsersList = props => {
    return (
        <ul>
            {props.users.map(user => (
                <li key={user.id}>
                    {user.firstname} {user.lastname} ({user.username})
                    {!props.selectedUsers.some(item => user.id === item.id) && (
                        <button onClick={() => props.addUser(user)}>+</button>
                    )}
                    {props.selectedUsers.some(item => user.id === item.id) && (
                        <span>*</span>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default NewConversationUsersList;
