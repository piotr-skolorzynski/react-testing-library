import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  render(<App />);
  console.log("This will run before each test")
})

beforeAll(() => {
  console.log("This will run once before all of the tests")
})

afterAll(() => {
  console.log("This will run once after all of the tests")
})

afterEach(() => {
  console.log("This will run after each test")
})

test("inputs should be initially empty", () => {
  const emailInputElement = screen.getByLabelText(/email/i);
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);

  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
  expect(confirmPasswordInputElement.value).toBe("");
})

test("should be able to type an email", () => {
  const emailInputElement = screen.getByRole("textbox", {name: /email/i});
  userEvent.type(emailInputElement, "selena@gmail.com");
  expect(emailInputElement.value).toBe("selena@gmail.com")
})

test("should be able to type a password", () => {
  const passwordInputElement = screen.getByLabelText("Password");
  userEvent.type(passwordInputElement, "pijMleko!22");
  expect(passwordInputElement.value).toBe("pijMleko!22")
})

test("should be able to type a confirmed password", () => {
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);
  userEvent.type(confirmPasswordInputElement, "pijMleko!22");
  expect(confirmPasswordInputElement.value).toBe("pijMleko!22")
})

test("should show email error message on invalid email", () => {
  const emailErrorElement = screen.queryByText(/the email you input is invalid/i);
  expect(emailErrorElement).not.toBeInTheDocument();

  const emailInputElement = screen.getByLabelText(/email/i);
  userEvent.type(emailInputElement, "selenagmail.com");

  const submitButtonElement = screen.getByRole("button", {name: /submit/i})
  userEvent.click(submitButtonElement);

  const emailErrorElementAgain = screen.queryByText(/the email you input is invalid/i);
  expect(emailErrorElementAgain).toBeInTheDocument()
})

test("should show password error message if password is less than 5 characters", () => {
  const emailInputElement = screen.getByRole("textbox", {name: /email/i});
  
  const passwordInputElement = screen.getByLabelText("Password");

  const passwordErrorElement = screen.queryByText(/the password you entered should contain 5 or more characters/i);

  userEvent.type(emailInputElement, "selena@gmail.com");

  expect(passwordErrorElement).not.toBeInTheDocument();

  userEvent.type(passwordInputElement, "123");

  const submitButtonElement = screen.getByRole("button", {name: /submit/i});

  userEvent.click(submitButtonElement);

  const passwordErrorElementAgain = screen.queryByText(/the password you entered should contain 5 or more characters/i);

  expect(passwordErrorElementAgain).toBeInTheDocument();
})

test("should show confirm password error message if passwords don't match", () => {
  const emailInputElement = screen.getByRole("textbox", {name: /email/i});
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordErrorElement = screen.queryByText(/the passwords don't match. try again/i);
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);
  const submitButtonElement = screen.getByRole("button", {name: /submit/i});
  
  userEvent.type(emailInputElement, "selena@gmail.com");
  userEvent.type(passwordInputElement, "12345");

  expect(confirmPasswordErrorElement).not.toBeInTheDocument();

  userEvent.type(confirmPasswordInputElement, "123456");

  userEvent.click(submitButtonElement);

  const confirmPasswordErrorElementAgain = screen.queryByText(/the passwords don't match. try again/i);

  expect(confirmPasswordErrorElementAgain).toBeInTheDocument();
})

test("should show no error message if every input is valid", () => {
  const emailInputElement = screen.getByRole("textbox", {name: /email/i});
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);
  const submitButtonElement = screen.getByRole("button", {name: /submit/i});
  
  userEvent.type(emailInputElement, "selena@gmail.com");
  userEvent.type(passwordInputElement, "12345");
  userEvent.type(confirmPasswordInputElement, "12345");
  userEvent.click(submitButtonElement);
  
  const emailErrorElement = screen.queryByText(/the email you input is invalid/i);
  const passwordErrorElement = screen.queryByText(/the password you entered should contain 5 or more characters/i);
  const confirmPasswordErrorElement = screen.queryByText(/the passwords don't match. try again/i);

  expect(emailErrorElement).not.toBeInTheDocument();
  expect(passwordErrorElement).not.toBeInTheDocument();
  expect(confirmPasswordErrorElement).not.toBeInTheDocument();
})