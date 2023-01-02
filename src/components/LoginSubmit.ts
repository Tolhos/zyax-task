import { useState } from "react";

interface ILoginSubmitProps {
	onIsLoggedInChange: (isLoggedIn: boolean) => void;
}

export const LoginSubmit = ({ onIsLoggedInChange }: ILoginSubmitProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const checkIsValidPassword = (password: string) => password !== "";

	const checkIsValidEmail = (email: string): boolean => {
		const emailRegex =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return String(email).match(emailRegex) !== null;
	};

	const handleSubmit = (
		event: React.FormEvent<EventTarget>,
		email: string,
		password: string
	) => {
		event.preventDefault();

		if (!checkIsValidEmail(email)) {
			setError("Please enter a valid email address");
			return;
		}
		if (!checkIsValidPassword(password)) {
			setError("Password field can not be empty");
			return;
		}

		setIsLoading(true);
		setError("");

		fetch("https://test.zyax.se/access/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.accessToken) {
					document.cookie = `access_token=${data.accessToken};path=/`;
					onIsLoggedInChange(true);
				} else {
					setError(data.error);
				}
				setIsLoading(false);
			})
			.catch((error) => {
				setError(error.message);
				setIsLoading(false);
			});
	};

	return { handleSubmit, isLoading, error };
};
