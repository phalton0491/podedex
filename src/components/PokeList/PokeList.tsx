import { createUseStyles } from 'react-jss';
import { Pokemon } from '../../hooks/useGetPokemons';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { getBackgroundColorByType, removeZeros } from '../../app/helpers';

interface PokeListProps {
    loading: boolean;
    filteredPokemon: Pokemon[];
}

export const PokeList = ({loading, filteredPokemon}: PokeListProps) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const learnMore = (id: string, name:string) => {
    navigate(`/pokemon/${id}/${name}`);
  };
  
  return (
    <div className={classes.root}>
      {loading && <Typography>Loading...</Typography>}
      {filteredPokemon.map((pkmn) => (
        <div onClick={() => learnMore(pkmn.id, pkmn.name)} className={classes.card} key={pkmn.id} style={{'background' : getBackgroundColorByType(pkmn.types[0])}}>
          <div className={classes.imageContainer}>
            <img className={classes.image} src={pkmn.image} />
          </div>
          <div className={classes.metaDataContainer}>
            <Typography>#{removeZeros(pkmn.number)}</Typography>
            <Typography>{pkmn.name}</Typography>
          <div className={classes.typeList}>
            {pkmn.types.map(type => <div className={classes.type} key={type}><Typography>{type}</Typography></div>)}
          </div>
          </div>
          </div>
      ))}
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      boxSizing: 'border-box',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '30px',
      padding: '16px',
      '@media (max-width: 768px)': {
        gridTemplateColumns: 'repeat(2, 1fr)', 
      }
    },

    card: {
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      cursor: 'pointer',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      },
      
    },

    imageContainer: {
      width: '100%',
      height: '350px',
      overflow: 'hidden'
    },

    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '10px',
    },

    metaDataContainer: {
        width: '80%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: '15px 0'
    },

    typeList: {
      display: 'flex',
    },

    type: {
      borderRadius: '10px',
      background :'#465672',
      padding: '5px',
      marginLeft:'15px'
    },


  },
  { name: 'PokemonList' }
);
