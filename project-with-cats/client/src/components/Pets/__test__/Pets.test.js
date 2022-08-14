import { render, screen } from "@testing-library/react";
import Pets from "../../Pets/Pets";
import { response, rest } from "msw";
import { setupServer } from "msw/node";
import catsMock from "../../../mocks/cats.json";
import userEvent from "@testing-library/user-event";

const server = setupServer(
    rest.get("http://localhost:4000/cats", (req, res, ctx) => {
        response(
            ctx.status(200),
            ctx.json(catsMock)
        )
    })
);

beforeEach(() => render(<Pets />));
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Pets', () => {
    test('should render correct amount of cards', async () => {
        const cards = await screen.findAllByRole("article");
        expect(cards.length).toBe(5);
    });

    test('should filter for male cats', async () => {
        const cards = await screen.findAllByRole("article");
        userEvent.selectOptions(screen.getByLabelText(/gender/i), "male");
        expect(screen.getAllByRole("article")).toStrictEqual([cards[1], cards[3]]);
    });

    test('should filter for female cats', async () => {
        const cards = await screen.findAllByRole("article");
        userEvent.selectOptions(screen.getByLabelText(/gender/i), "female");
        expect(screen.getAllByRole("article")).toStrictEqual([cards[0], cards[2]], cards[4]);
    });
    
    
});
