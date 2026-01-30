import { screen, fireEvent } from "@testing-library/react";
//import { logTestingPlaygroundURL } from "@testing-library/dom";



import RequestResetPage from "../pages/RequestResetPage";
import { renderWithAuth } from "./test-utils";

///reset?token=abc123&email=test7@test.com

describe("RequestResetPage", () => {

    // FAILED NOT SURE WHAT THIS TEST DOES
    /*test("renders email inputs", () => {
        renderWithAuth(<RequestResetPage />, { route: "/reset?token=abc123&email=test7@test.com" });

        expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument(); //CANT FIND THIS ITS NOT IN FILE?

    });*/

    test("allows typing into email  fields", async () => {
        renderWithAuth(<RequestResetPage />, { route: "/reset?token=abc123&email=test10@test.com" });

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: "test10@test.com" },
        });
        expect(screen.getByLabelText(/email/i)).toHaveValue("test10@test.com");

    });

//FAILED
    test("successful reset password request", async () => {

        renderWithAuth(<RequestResetPage />, { route: "/reset?token=abc123&email=test7@test.com" });

        fireEvent.change(screen.getByLabelText(/email/i), { 
        target: { value: "test7@test.com" },
        });

        fireEvent.click(screen.getByRole("button", { name: /Send Reset/i })); //request-reset
    
        const status = await screen.findByRole("status");//CANT FIND THIS 
        expect(status).toHaveTextContent(/An email to reset your password/i);

    });
//FAILED
    test("failed reset password request", async () => {

        renderWithAuth(<RequestResetPage />, { route: "/reset?token=abc123&email=test7@test.com" });

        fireEvent.change(screen.getByLabelText(/email/i), { 
        target: { value: "test@test.com" },
        });

        fireEvent.click(screen.getByRole("button", { name: /Send Reset/i })); //request-reset
    
        const status = await screen.findByRole("error"); //CANT FIND THIS
        expect(status).toHaveTextContent(/Account does not exist/i);

    });

    test('finds the input using document.getElementById', () => {
        renderWithAuth(<RequestResetPage />, { route: "/reset?token=abc123&email=test7@test.com" });
        
        // Access the element directly from the document body
        const inputEmailElement = document.getElementById('email'); 
        expect(inputEmailElement).toBeInTheDocument();

    });

});
