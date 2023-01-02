import styled from "styled-components";
import { User } from "@styled-icons/boxicons-solid/User";
import { Lock } from "@styled-icons/fa-solid/Lock";
import { useState } from "react";
import { Button } from "./Button";
import { LoginSubmit } from "./LoginSubmit";

interface ILoginView {
	onIsLoggedInChange: (boolean: boolean) => void;
}

interface IInputField {
	type: string;
}

export const LoginView = ({ onIsLoggedInChange }: ILoginView) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { handleSubmit, isLoading, error } = LoginSubmit({
		onIsLoggedInChange,
	});

	const loginDisabled = email === "" || password === "";

	const handleEmailInput = (event: React.FormEvent<EventTarget> | any) => {
		setEmail(event.target.value);
	};

	const handlePasswordInput = (event: React.FormEvent<EventTarget> | any) => {
		setPassword(event.target.value);
	};

	return (
		<LoginContainer>
			<form>
				<Header>USER LOGIN</Header>
				<InputField
					type="username"
					// onBlur={() => setIsValidEmail(checkIsValidEmail(email))}
				>
					<span>
						<User />
					</span>
					<input
						placeholder="Email"
						value={email}
						onChange={handleEmailInput}
						data-testid="email-input"
					/>
				</InputField>

				<InputField type="password">
					<span>
						<Lock />
					</span>
					<input
						placeholder="Password"
						// onBlur={() => setIsValidPassword(checkIsValidPassword)}
						type="password"
						value={password}
						onChange={handlePasswordInput}
						data-testid="password-input"
					/>
				</InputField>

				{error && <p data-testid="error-message">{error}</p>}
				<Button
					onClick={(e) => handleSubmit(e, email, password)}
					type="login"
					disabled={loginDisabled}
					isLoading={isLoading}
				/>
			</form>
		</LoginContainer>
	);
};

const LoginContainer = styled.div`
	height: 35rem;
	width: 35rem;

	form {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		p {
			margin-top: 1rem;
			color: red;
		}
	}
`;

const Header = styled.header`
	width: 100%;
	display: flex;
	justify-content: center;
	font-size: 2rem;
	font-weight: 700;
	margin-top: 2rem;
	color: white;
`;
const InputField = styled.div<IInputField>`
	width: 90%;
	display: flex;
	justify-content: center;
	margin-top: 2rem;
	align-items: center;
	position: relative;
	input {
		width: 70%;
		height: 3.2rem;
		padding: 1rem 0rem 1rem 2.7rem;
		padding: ${({ type }) =>
			type === "username" ? "1rem 0rem 1rem 3rem" : "1rem 0rem 1rem 1.5rem"};
		border-radius: 18px;
		outline: none;
		border: none;
		background: rgba(255, 255, 255, 0.3);
		backdrop-filter: blur(2px);
		font-size: 1rem;

		&::placeholder {
			color: black;
		}
	}
	span {
		width: 4rem;
		height: 4rem;
		border-radius: 100%;
		background-color: white;
		position: absolute;
		left: 10%;
		left: ${({ type }) => (type === "username" ? "10%" : "75%")};
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 2;

		svg {
			height: 2rem;
		}
	}
`;
