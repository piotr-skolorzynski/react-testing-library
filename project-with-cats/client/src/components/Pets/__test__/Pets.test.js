import { render, screen } from "@testing-library/react";
import Pets from "../../Pets/Pets";
import { response, rest } from "msw";
import { setupServer } from "msw/node";
import catsMock from "../../../mocks/cats.json";

const server = setupServer(
    rest.get("http://localhost:4000/cats", (req, res, ctx) => {
        response(
            ctx.status(200),
            ctx.json(catsMock)
        )
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Pets', () => {
    test('should render correct amount of cards', async () => {
        render(<Pets />);
        const cards = await screen.findAllByRole("article");
        expect(cards.length).toBe(5);
    });
    
});
