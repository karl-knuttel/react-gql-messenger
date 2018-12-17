import React from 'react';
import styled from 'styled-components';

const StyledTitleBar = styled.div`
	height: 4rem;
`;

const TitleBar = props => {
	return (
		<StyledTitleBar>
			<p>I'm the title bar thing</p>
		</StyledTitleBar>
	);
};

export default TitleBar;
