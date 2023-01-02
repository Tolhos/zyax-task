import { LoginView } from "./components/LoginView";
import styled from "styled-components";
import { useState } from "react";
import { Content } from "./components/Content";

export const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const onIsLoggedInChange = (boolean: boolean) => {
		setIsLoggedIn(boolean);
	};

	return (
		<AppContainer>
			{!isLoggedIn ? (
				<LoginView
					data-testid="LoginView"
					onIsLoggedInChange={onIsLoggedInChange}
				/>
			) : (
				<Content onIsLoggedInChange={onIsLoggedInChange} />
			)}
		</AppContainer>
	);
};

const AppContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: linear-gradient(-45deg, #01292d 50%, #00222e 0%),
		linear-gradient(rgba(1, 41, 45, 1), rgba(1, 41, 45, 0) 0%);
`;
