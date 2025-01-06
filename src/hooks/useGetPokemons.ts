import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

//added number, types, and image for updated graphql query
export type Pokemon = {
  id: string;
  name: string;
  number: number;
  types: string[];
  image: string;
};

export type PokemonOption = {
  value: Pokemon['id'];
  label: Pokemon['name'];
};

export const GET_POKEMONS = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      name
      number
      types
      image
    }
  }
`;


export const useGetPokemons = (searchQuery: string | undefined) => {

  const { data, ...queryRes } = useQuery(GET_POKEMONS, {
    variables: {
      first: 151, // Keep hard coded
    },
  });

  const pokemons: Pokemon[] = useMemo(() => data?.pokemons || [], [data]);
  // filteredPokemon will return an array of pokemon that only are matching by name (.includes for case sesitivity)
  const filteredPokemon: Pokemon[] = useMemo(() => 
    searchQuery ? pokemons.filter((pokemon: Pokemon) => pokemon.name.includes(searchQuery)) : pokemons
  , [searchQuery, data])

  const pokemonOptions: PokemonOption[] = useMemo(
    () => pokemons.map((p: Pokemon) => ({ value: p.id, label: p.name })),
    [pokemons]
  );

  return {
    pokemons,
    pokemonOptions,
    filteredPokemon,
    ...queryRes,
  };
};
