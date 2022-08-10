import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  render(<App />);
})

const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByLabelText(/email/i);
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);

  if(email) {
    userEvent.type(emailInputElement, email);
  }

  if(password) {
    userEvent.type(passwordInputElement, password);
  }

  if (confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }

  return { emailInputElement, passwordInputElement, confirmPasswordInputElement }
}

test("inputs should be initially empty", () => {
  const emailInputElement = screen.getByLabelText(/email/i);
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);

  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
  expect(confirmPasswordInputElement.value).toBe("");
})

test("should be able to type an email", () => {
  const { emailInputElement } = typeIntoForm({email: "selena@gmail.com"});
  expect(emailInputElement.value).toBe("selena@gmail.com")
})

test("should be able to type a password", () => {
  const { passwordInputElement } = typeIntoForm({password: "pijMleko!22"});
  expect(passwordInputElement.value).toBe("pijMleko!22")
})

test("should be able to type a confirmed password", () => {
  const { confirmPasswordInputElement } = typeIntoForm({confirmPassword: "pijMleko!22"});
  expect(confirmPasswordInputElement.value).toBe("pijMleko!22")
})

test("should show email error message on invalid email", () => {
  const emailErrorElement = screen.queryByText(/the email you input is invalid/i);
  expect(emailErrorElement).not.toBeInTheDocument();

  typeIntoForm({email: "selenagmail.com"});

  const submitButtonElement = screen.getByRole("button", {name: /submit/i})
  userEvent.click(submitButtonElement);

  const emailErrorElementAgain = screen.queryByText(/the email you input is invalid/i);
  expect(emailErrorElementAgain).toBeInTheDocument()
})

test("should show password error message if password is less than 5 characters", () => {
  const passwordErrorElement = screen.queryByText(/the password you entered should contain 5 or more characters/i);
  typeIntoForm({email: "selena@gmail.com"});
  expect(passwordErrorElement).not.toBeInTheDocument();
  typeIntoForm({password: "123"});
  const submitButtonElement = screen.getByRole("button", {name: /submit/i});
  userEvent.click(submitButtonElement);
  const passwordErrorElementAgain = screen.queryByText(/the password you entered should contain 5 or more characters/i);
  expect(passwordErrorElementAgain).toBeInTheDocument();
})

test("should show confirm password error message if passwords don't match", () => {
  const confirmPasswordErrorElement = screen.queryByText(/the passwords don't match. try again/i);
  const submitButtonElement = screen.getByRole("button", {name: /submit/i});
  
  typeIntoForm({ email: "selena@gmail.com", password: "12345" });
  expect(confirmPasswordErrorElement).not.toBeInTheDocument();

  typeIntoForm({ confirmPassword: "123456" });

  userEvent.click(submitButtonElement);

  const confirmPasswordErrorElementAgain = screen.queryByText(/the passwords don't match. try again/i);

  expect(confirmPasswordErrorElementAgain).toBeInTheDocument();
})

test("should show no error message if every input is valid", () => {
  const submitButtonElement = screen.getByRole("button", {name: /submit/i});
  
  typeIntoForm({ email: "selena@gmail.com", password: "12345", confirmPassword: "12345" });
  userEvent.click(submitButtonElement);
  
  const emailErrorElement = screen.queryByText(/the email you input is invalid/i);
  const passwordErrorElement = screen.queryByText(/the password you entered should contain 5 or more characters/i);
  const confirmPasswordErrorElement = screen.queryByText(/the passwords don't match. try again/i);

  expect(emailErrorElement).not.toBeInTheDocument();
  expect(passwordErrorElement).not.toBeInTheDocument();
  expect(confirmPasswordErrorElement).not.toBeInTheDocument();
})