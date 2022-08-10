import { render, screen } from "@testing-library/react";
import Card from "../Card";

const cardProps = {
    name: "Sydney",
    phone: "111-111-111", 
    email: "laith@hotmail.com", 
    image: {
        url: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        alt: "cute cat"
    },
    favoured: false
}

describe('Card', () => {
    test('should show name of cat', () => {
        render(<Card {...cardProps} />);
        expect(screen.getByRole("heading", {name: /sydney/i}).toBeInTheDocument())
    });

    test('should show phone number', () => {
        render(<Card {...cardProps} />);
        expect(screen.getByText(/111-111-111/i).toBeInTheDocument())
    });

    test('should show email', () => {
        render(<Card {...cardProps} />);
        expect(screen.getByText(/laith@hotmail.com/i).toBeInTheDocument())
    });
    
});
