import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type Pokemon = {
  id: string;
  name: string;
  number: number;
  types: string[];
  image: string; //added image to Pokemon interface
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


export const useGetPokemons = () => {
  const [searchPokemonQuery, setSearchPokemonQuery] = useState<string | null>(null)

  const { data, ...queryRes } = useQuery(GET_POKEMONS, {
    variables: {
      first: 151, // Keep hard coded
    },
  });

  const pokemons: Pokemon[] = useMemo(() => data?.pokemons || [], [data]);

  const filteredPokemon: Pokemon[] = useMemo(() => 
    searchPokemonQuery ? pokemons.filter((pokemon: Pokemon) => pokemon.name.includes(searchPokemonQuery)) : pokemons
  , [searchPokemonQuery, data])

  const pokemonOptions: PokemonOption[] = useMemo(
    () => pokemons.map((p: Pokemon) => ({ value: p.id, label: p.name })),
    [pokemons]
  );

  return {
    pokemons,
    pokemonOptions,
    filteredPokemon,
    searchPokemonQuery, 
    setSearchPokemonQuery,
    ...queryRes,
  };
};
