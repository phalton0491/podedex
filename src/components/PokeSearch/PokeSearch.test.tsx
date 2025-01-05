import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { PokeSearch } from "./PokeSearch";


describe('PokeSearch', () => {
    const mockSetSearchPokemonQuery = jest.fn();

    beforeEach(() => {
        mockSetSearchPokemonQuery.mockClear();
    })

    test('render search', () => {
        render(<PokeSearch searchPokemonQuery={"Bulbasaur"} setSearchPokemonQuery={mockSetSearchPokemonQuery} />);
      });

    test('calls {setSearchPokemonQuery} when typing in searchbar', () => {
        const value = "Char"
        render(<PokeSearch searchPokemonQuery={""} setSearchPokemonQuery={mockSetSearchPokemonQuery} />)
        const input = screen.getByPlaceholderText("Search Pokemon");
        fireEvent.change(input, {target: {value}});
        expect(mockSetSearchPokemonQuery).toHaveBeenCalledWith(value);
    })
})
