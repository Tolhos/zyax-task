import styled from "styled-components";

interface IButtonProps {
	type: "login" | "logout";
	onClick: (event: React.FormEvent<EventTarget>) => void;
	disabled?: boolean;
	isLoading?: boolean;
}

export const Button = ({
	type,
	onClick,
	disabled,
	isLoading,
}: IButtonProps) => {
	const handleClick = (event: React.FormEvent<EventTarget>) => {
		event.preventDefault();
		onClick(event);
	};

	return (
		<ButtonView
			onClick={handleClick}
			data-testid="submit-button"
			disabled={isLoading || disabled}
			type="submit"
		>
			{isLoading ? "Loading..." : type === "login" ? "LOGIN" : "LOGOUT"}
		</ButtonView>
	);
};

const ButtonView = styled.button`
	width: 9rem;
	margin-top: 2rem;
	height: 3rem;
	border-radius: 20px;
	border: none;
	background-color: white;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1rem;
	font-weight: 900;
`;
