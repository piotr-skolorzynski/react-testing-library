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

const clickOnSubmitButton = () => {
  const submitButtonElement = screen.getByRole("button", {name: /submit/i});
  userEvent.click(submitButtonElement);
}

test("inputs should be initially empty", () => {
  expect(screen.getByLabelText(/email/i).value).toBe("");
  expect(screen.getByLabelText("Password").value).toBe("");
  expect(screen.getByLabelText(/confirm password/i).value).toBe("");
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
  expect(screen.queryByText(/the email you input is invalid/i)).not.toBeInTheDocument();
  typeIntoForm({email: "selenagmail.com"});
  clickOnSubmitButton();
  expect(screen.queryByText(/the email you input is invalid/i)).toBeInTheDocument()
})

test("should show password error message if password is less than 5 characters", () => {
  typeIntoForm({email: "selena@gmail.com"});
  expect(screen.queryByText(/the password you entered should contain 5 or more characters/i)).not.toBeInTheDocument();
  typeIntoForm({password: "123"});
  clickOnSubmitButton();
  expect(screen.queryByText(/the password you entered should contain 5 or more characters/i)).toBeInTheDocument();
})

test("should show confirm password error message if passwords don't match", () => {
  typeIntoForm({ email: "selena@gmail.com", password: "12345" });
  expect(screen.queryByText(/the passwords don't match. try again/i)).not.toBeInTheDocument();
  typeIntoForm({ confirmPassword: "123456" });
  clickOnSubmitButton();
  expect(screen.queryByText(/the passwords don't match. try again/i)).toBeInTheDocument();
})

test("should show no error message if every input is valid", () => {
  typeIntoForm({ email: "selena@gmail.com", password: "12345", confirmPassword: "12345" });
  clickOnSubmitButton();
  expect(screen.queryByText(/the email you input is invalid/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/the password you entered should contain 5 or more characters/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/the passwords don't match. try again/i)).not.toBeInTheDocument();
})