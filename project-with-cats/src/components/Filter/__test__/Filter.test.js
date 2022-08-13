import { render, screen } from "@testing-library/react";
import Filter from "../Filter";
import userEvent from "@testing-library/user-event";

describe('Filter', () => {
    test('should be able to change value of favourite select', () => {
        render(<Filter />);
        const select = screen.getByLabelText(/favourite/i);
        expect(select.value).toBe(/any/i);
        userEvent.selectOptions(select, "favourite");
        expect(select.value).toBe(/favourite/i);
        userEvent.selectOptions(select, "not favourite");
        expect(select.value).toBe(/not favourite/i);
    });

    test('should be able to change value of gender select', () => {
        render(<Filter />);
        const select = screen.getByLabelText(/gender/i);
        expect(select.value).toBe(/any/i);
        userEvent.selectOptions(select, "female");
        expect(select.value).toBe(/female/i);
        userEvent.selectOptions(select, "male");
        expect(select.value).toBe(/male/i);
    });
    
});
