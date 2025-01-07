import { createUseStyles } from 'react-jss';

interface PokeSearchProps  {
    searchPokemonQuery: string | null,
    setSearchPokemonQuery: (query: string) => void
}

export const PokeSearch = ({searchPokemonQuery, setSearchPokemonQuery}: PokeSearchProps) => {
    const classes = useStyles();

    const handleChange = (query: string) => {
        setSearchPokemonQuery(query);
    }
    return (
        <div className={classes.root}>
            <input
                className={classes.input}
                placeholder={'Search Pokemon'}
                onChange={(e) => handleChange(e.target.value)}
                value={searchPokemonQuery ?? ''}
            />
        </div>
    )
}

const useStyles = createUseStyles(
    {
      root: {
        margin: '20px',
        display: 'flex',
        justifyContent: 'center'
      },
      input: {
        width: '50%',
        height: '50px',
        borderRadius: '10px',
        fontSize: '17px',
        color: '#4B5066',
        paddingLeft: '10px',
        '&::placeholder': {
            color: '#4B5066 ', 
            fontSize: '17px',
          }
      },
    },
    { name: 'PokeSearch' }
  );