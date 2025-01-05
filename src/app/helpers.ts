import { pokemonColors, pokemonQuotes } from "./contants";

export const getBackgroundColorByType = (type: string): string => {
    return pokemonColors[type.toLocaleLowerCase() as keyof typeof pokemonColors]
};

export const removeZeros = (pokemonNumber: number) : string => {
    return String(pokemonNumber).replace(/^0+/, '') || '0'
};

export const getRandomPokemonQuote = () => {
    const randomQuote = pokemonQuotes[Math.floor(Math.random() * pokemonQuotes.length)];
    return randomQuote;
};