import { createUseStyles } from 'react-jss';
import { PokeList, PokeSearch } from '../components';
import { useGetPokemons } from '../hooks/useGetPokemons';
import { useSearch } from '../contexts/SearchContext';

export const ListPage = () => {
  const classes = useStyles();
  const { searchQuery, setSearchQuery } = useSearch();
  const { filteredPokemon, loading } = useGetPokemons(searchQuery);

  return (
    <div className={classes.root}>
      <PokeSearch searchPokemonQuery={searchQuery} setSearchPokemonQuery={setSearchQuery}/>
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
