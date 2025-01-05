import { FormControl, TextField } from "@mui/material"
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
            <FormControl sx={{ width: '100%' }}>

            <TextField
                placeholder={'Search Pokemon'}
                onChange={(e) => handleChange(e.target.value)}
                value={searchPokemonQuery ?? ''}
                sx={{
                    input: { color: '#FFF'},
                    '& .MuiOutlinedInput-root': { 
                        width: '100%', backgroundColor: '#4f5f7e',
                        '& .MuiInputBase-input::placeholder': { color: '#FFF' },
                    },
                  }}
            />
            </FormControl>
        </div>
    )
}

const useStyles = createUseStyles(
    {
      root: {
        margin: '20px'
      },
  

    },
    { name: 'PokeSearch' }
  );