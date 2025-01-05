import { createUseStyles } from 'react-jss';
import { PokeList, PokeSearch } from '../components';
import { useGetPokemons } from '../hooks/useGetPokemons';
import { useGetPokemon } from '../hooks/useGetPokemon';

export const ListPage = () => {
  const classes = useStyles();
  const { filteredPokemon, loading, searchPokemonQuery, setSearchPokemonQuery } = useGetPokemons();

  return (
    <div className={classes.root}>
      <PokeSearch searchPokemonQuery={searchPokemonQuery} setSearchPokemonQuery={setSearchPokemonQuery}/>
      <PokeList filteredPokemon={filteredPokemon} loading={loading} />
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      height: '100%',
    },
  },
  { name: 'ListPage' }
);
