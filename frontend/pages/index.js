import React from 'react';
import TitleBar from '../components/TitleBar';
import Chats from '../components/Chats';
import ChatInput from '../components/ChatInput';

const Home = props => (
	<div>
		<TitleBar />
		<Chats />
		<ChatInput />
	</div>
);

export default Home;
