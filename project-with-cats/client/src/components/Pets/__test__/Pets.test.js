import { render, screen } from "@testing-library/react";
import Pets from "../../Pets/Pets";

describe('Pets', () => {
    test('should render correct amount of cards', async () => {
        render(<Pets />);
        const cards = await screen.findAllByRole("article");
        expect(cards.length).toBe(5);
    });
    
});
