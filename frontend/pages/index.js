import React from 'react';
import TitleBar from '../components/TitleBar';
import Chat from '../components/Chat';
import ChatInput from '../components/ChatInput';

const Home = props => (
	<div>
		<TitleBar />
		<Chat />
		<ChatInput />
	</div>
);

export default Home;
