import React from 'react';
import styled from 'styled-components';

const ChatsStyles = styled.div`
	height: calc(100vh - 14rem);
	/* background-color: red; */
	overflow-y: auto;
`;

const Chats = () => {
	return (
		<ChatsStyles>
			<p>chats</p>
		</ChatsStyles>
	);
};

export default Chats;
