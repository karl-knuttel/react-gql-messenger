import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import StyledChatInput from './styles/ChatInput';

const CREATE_MESSAGE_MUTATION = gql`
	mutation CREATE_MESSAGE_MUTATION($text: String!) {
		createMessage(text: $text) {
			id
		}
	}
`;

class ChatInput extends Component {
	state = {
		text: ''
	};

	handleChange = e => {
		const { name, type, value } = e.target;
		this.setState({ [name]: value });
	};

	render() {
		return (
			<Mutation mutation={CREATE_MESSAGE_MUTATION} variables={this.state}>
				{(createMessage, { loading, error }) => (
					<StyledChatInput
						onSubmit={async e => {
							e.preventDefault();
							const res = await createMessage();
							this.setState({ text: '' });
						}}
					>
						<fieldset>
							<input
								name        = "text"
								type        = "text"
								id          = "text"
								placeholder = "Start typing something"
								value       = {this.state.text}
								required
								onChange = {this.handleChange}
							/>
						</fieldset>
					</StyledChatInput>
				)}
			</Mutation>
		);
	}
}

export default ChatInput;
