import { screen, fireEvent } from "@testing-library/react";
//import { logTestingPlaygroundURL } from "@testing-library/dom";



import SignupPage from "../pages/SignupPage";
import { renderWithAuth } from "./test-utils";

describe("SignupPage", () => {

  test("shows password mismatch rule when passwords differ", async () => {
      renderWithAuth(<SignupPage />, { route: "/signup" });

      fireEvent.change(screen.getByLabelText(/^password$/i), {
        target: { value: "Password1" },
      });

      fireEvent.change(screen.getByLabelText(/confirm password/i), {
        target: { value: "Password2" },
      });

      const rule = await screen.findByText(/passwords match/i);

      // rule exists
      expect(rule).toBeInTheDocument();

      // rule is in invalid (gray) state
      expect(rule.closest("li")).toHaveClass("text-gray-400");
  });


  test("signup button is disabled when passwords do not match", async () => {
    renderWithAuth(<SignupPage />, { route: "/signup" });

    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: "Password1" },
    });

    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "Password2" },
    });

    const button = screen.getByRole("button", { name: /sign up/i });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");

  });


//An account with this email already exists.  when already signed up
  test("failed signup shows account with this email already exists message", async () => {

    renderWithAuth(<SignupPage />, { route: "/signup" });


    fireEvent.change(screen.getByLabelText(/first/i), { //name: firstname
      target: { value: "John" },
    });

    fireEvent.change(screen.getByLabelText(/last/i), { //name: email-field
      target: { value: "Smith" },
    });

    fireEvent.change(screen.getByLabelText(/email/i), { //name: email-field
      target: { value: "test11@test.com" },
    });

    fireEvent.change(screen.getByLabelText(/^password$/i), { //name: password-field
      target: { value: "Abc234&5" },
    });

    fireEvent.change(screen.getByLabelText(/confirm password/i), {  //name confirm-password-field
      target: { value: "Abc234&5" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i })); //signup-button

    const error = await screen.findByText(
      /An account with this email already exists/i
    );

    expect(error).toBeInTheDocument();


  });
  
  test("successful signup shows check email message", async () => {

    renderWithAuth(<SignupPage />, { route: "/signup" });


    fireEvent.change(screen.getByLabelText(/first/i), { //name: firstname
      target: { value: "John" },
    });

    fireEvent.change(screen.getByLabelText(/last/i), { //name: email-field
      target: { value: "Smith" },
    });

    fireEvent.change(screen.getByLabelText(/email/i), { //name: email-field
      target: { value: "test14@test.com" },
    });

    fireEvent.change(screen.getByLabelText(/^password$/i), { //name: password-field
      target: { value: "Abc234&5" },
    });

    fireEvent.change(screen.getByLabelText(/confirm password/i), {  //name confirm-password-field
      target: { value: "Abc234&5" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i })); //signup-button
  
  
    //You signed up!, Check your inbox. We’ve sent you an email to verify your account.
    const status = await screen.findByRole("status");
    expect(status).toHaveTextContent(/You signed up/i);

  
    //
    expect(
        await screen.findByText(/Check your inbox/i)
      ).toBeInTheDocument();
    

    //You signed up!, Check your inbox. We’ve sent you an email to verify your account.

    });

  test("toggles password visibility", () => {
          renderWithAuth(<SignupPage />, { route: "/signup" });
  
          const passwordInput = screen.getByLabelText(/^password$/i);
          const toggleButton = screen.getByRole("button", {
            name: /show password/i,
        });
  
          expect(passwordInput).toHaveAttribute("type", "password");
  
          fireEvent.click(toggleButton);
  
          expect(passwordInput).toHaveAttribute("type", "text");
      });  


  test('finds the input using document.getElementById', () => {
    renderWithAuth(<SignupPage />, { route: "/signup" });
    
    // Access the element directly from the document body
    const inputFirstNameElement = document.getElementById('first-name'); 
    // Access the element directly from the document body
    const inputLastNameElement = document.getElementById('last-name'); 
    expect(inputFirstNameElement).toBeInTheDocument();
    expect(inputLastNameElement).toBeInTheDocument();
  });

});
