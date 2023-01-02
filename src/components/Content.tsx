import styled from "styled-components";
import { Button } from "./Button";

interface IContentProps {
	onIsLoggedInChange: (boolean: boolean) => void;
}

export const Content = ({ onIsLoggedInChange }: IContentProps) => {
	const message =
		"Welcome to the Logout Button Lounge! We're glad you logged in, even though there's not much to see here. At least you have the logout button to keep you company. So go ahead and log out, we promise we won't be offended.";

	const handleLogout = () => {
		onIsLoggedInChange(false);
		document.cookie =
			"access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	};

	return (
		<ContentContainer>
			<h2>{message}</h2>
			<Button type="logout" onClick={handleLogout} />
		</ContentContainer>
	);
};

const ContentContainer = styled.div`
	width: 40%;
	display: flex;
	flex-direction: column;
	align-items: center;
	h2 {
		color: white;
	}
`;
