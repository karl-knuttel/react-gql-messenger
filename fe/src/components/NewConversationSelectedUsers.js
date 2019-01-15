import React from 'react';

const NewConversationSelectedUsers = props => {
    return (
        <div>
            {props.selectedUsers.map((user, index) => (
                <span key={index}>
                    {user.id === props.currentUser.id && 'You'}
                    {user.id !== props.currentUser.id && (
                        <>
                            {user.firstname} {user.lastname}
                            <button onClick={() => props.removeUser(user)}>
                                &times;
                            </button>
                        </>
                    )}
                </span>
            ))}
        </div>
    );
};

export default NewConversationSelectedUsers;
