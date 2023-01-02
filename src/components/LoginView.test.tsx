import {
	findByText,
	fireEvent,
	cleanup,
	render,
	waitFor,
} from "@testing-library/react";
import { LoginView } from "./LoginView";
import "@testing-library/jest-dom";

describe("LoginView", () => {
	it("should render the form with empty fields", () => {
		const onIsLoggedInChange = jest.fn();
		const { getByTestId } = render(
			<LoginView onIsLoggedInChange={onIsLoggedInChange} />
		);
		const emailInput = getByTestId("email-input") as HTMLInputElement;
		const passwordInput = getByTestId("password-input") as HTMLInputElement;

		expect(emailInput.value).toBe("");
		expect(passwordInput.value).toBe("");
	});

	it("should disable submit button if email or password are not provided", () => {
		const onIsLoggedInChange = jest.fn();
		const { getByTestId } = render(
			<LoginView onIsLoggedInChange={onIsLoggedInChange} />
		);
		const emailInput = getByTestId("email-input") as HTMLInputElement;
		const passwordInput = getByTestId("password-input") as HTMLInputElement;

		fireEvent.change(emailInput, { target: { value: "" } });
		fireEvent.change(passwordInput, { target: { value: "" } });

		const submitButton = getByTestId("submit-button");
		expect(submitButton).toBeDisabled();
	});

	it("on submit, if the email provided is invalid, error message is displayed", async () => {
		const onIsLoggedInChange = jest.fn();

		const { getByTestId, queryByTestId } = render(
			<LoginView onIsLoggedInChange={onIsLoggedInChange} />
		);

		const emailInput = getByTestId("email-input");
		const passwordInput = getByTestId("password-input");

		fireEvent.change(emailInput, { target: { value: "invalidemail" } });
		fireEvent.change(passwordInput, { target: { value: "123" } });

		const submitButton = getByTestId("submit-button");
		fireEvent.click(submitButton);

		expect(queryByTestId("error-message")).not.toBeNull();
	});

	it("on button click, if the login fails, verify that the error message is displayed", async () => {
		global.fetch = jest
			.fn()
			.mockImplementation(() => Promise.reject(new Error("Mock login error")));

		const onIsLoggedInChange = jest.fn();

		const { getByTestId } = render(
			<LoginView onIsLoggedInChange={onIsLoggedInChange} />
		);

		const emailInput = getByTestId("email-input");
		const passwordInput = getByTestId("password-input");

		fireEvent.change(emailInput, { target: { value: "test@example.com" } });
		fireEvent.change(passwordInput, { target: { value: "password123" } });

		const submitButton = getByTestId("submit-button");
		fireEvent.click(submitButton);

		const errorMessage = await findByText(document.body, "Mock login error");
		expect(errorMessage).not.toBeNull();
	});

	it("on successful login, the access token should be stored in a cookie or local storage", async () => {
		global.fetch = jest.fn().mockImplementation(() =>
			Promise.resolve({
				json: () =>
					Promise.resolve({
						accessToken: "abc123",
					}),
			})
		);

		const onIsLoggedInChange = jest.fn();

		const { getByTestId } = render(
			<LoginView onIsLoggedInChange={onIsLoggedInChange} />
		);

		const emailInput = getByTestId("email-input");
		const passwordInput = getByTestId("password-input");

		fireEvent.change(emailInput, { target: { value: "test@example.com" } });
		fireEvent.change(passwordInput, { target: { value: "password123" } });

		const submitButton = getByTestId("submit-button");
		fireEvent.click(submitButton);

		await waitFor(() => expect(onIsLoggedInChange).toHaveBeenCalledWith(true));

		expect(document.cookie).toBe("access_token=abc123");
	});
});
