import React, { Component } from 'react';
import styled from 'styled-components';

const Form = styled.form`
	position: absolute;
	bottom  : 0;
	left    : 0;
	width   : 100%;
	height  : 6rem;
	padding : 0 2rem;
	fieldset {
		padding: 0;
		margin : 0;
		border : none;
	}
	input {
		font-size    : 1.2rem;
		width        : 100%;
		height       : 4rem;
		padding      : 1rem;
		border       : 2px solid grey;
		border-radius: 7px;
		&:focus {
			outline     : 0;
			border-color: ${props => props.theme.colorPrimary};
		}
	}
`;

class ChatInput extends Component {
	state = {
		message: ''
	};

	handleChange = e => {
		const { name, type, value } = e.target;
		this.setState({ [name]: value });
	};

	render() {
		return (
			<Form>
				<fieldset>
					<input
						name        = "message"
						type        = "text"
						id          = "message"
						placeholder = "Start typing something"
						value       = {this.state.message}
						required
						onChange = {this.handleChange}
					/>
				</fieldset>
			</Form>
		);
	}
}

export default ChatInput;
