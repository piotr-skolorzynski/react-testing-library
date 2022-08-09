import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test("inputs should be initially empty", () => {
  render(<App />)
  const emailInputElement = screen.getByLabelText(/email/i);
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);

  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
  expect(confirmPasswordInputElement.value).toBe("");
})

test("should be able to type an email", () => {
  render(<App />)
  const emailInputElement = screen.getByRole("textbox", {name: /email/i});
  userEvent.type(emailInputElement, "selena@gmail.com");
  expect(emailInputElement.value).toBe("selena@gmail.com")
})

test("should be able to type a password", () => {
  render(<App />)
  const passwordInputElement = screen.getByLabelText("Password");
  userEvent.type(passwordInputElement, "pijMleko!22");
  expect(passwordInputElement.value).toBe("pijMleko!22")
})

test("should be able to type a confirmed password", () => {
  render(<App />)
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);
  userEvent.type(confirmPasswordInputElement, "pijMleko!22");
  expect(confirmPasswordInputElement.value).toBe("pijMleko!22")
})
