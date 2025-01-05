import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPokemon } from "../../hooks/useGetPokemon";
import { createUseStyles } from "react-jss";
import { getBackgroundColorByType, getRandomPokemonQuote, removeZeros } from "../../app/helpers";

interface HeightWeight {
  minimum: string;
  maximum: string;
}

interface DialogPokemon {
  id: string;
  number: number;
  name:string;
  weight: HeightWeight;
  height: HeightWeight;
  classification: string;
  types: string[];
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  image: string
}

export const PokeDialog: React.FC = () => {
  const [pokemon, setPokemon] = useState<DialogPokemon | undefined>(undefined);
    const { id, name } = useParams();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const {data} = useGetPokemon(id!,name!)
    const classes = useStyles();
    useEffect(() => { if (data && data.pokemon)  setPokemon(data.pokemon) },[data]);
    useEffect(() => { if (id && name) { setOpen(true); }}, [id, name]);
  
    const handleClose = () => {
      navigate('/pokemon')
      setOpen(false);  
    };
  
    return (
    <>
     {pokemon && 
        <Dialog 
          open={open} 
          onClose={handleClose}
          sx={{
            '& .MuiDialog-paper': {
              background: getBackgroundColorByType(pokemon?.types[0]),
              color: '#333',
            },
          }}
        >
         <DialogTitle>{getRandomPokemonQuote()}</DialogTitle>
          <DialogContent>
            <div className={classes.root}>
              <div className={classes.upperContent}>
              <div>
                <img className={classes.image} src={pokemon.image} />
              </div>
              <div className={classes.name}>
                <div className={classes.text}><Typography color="#333" variant="h4">{pokemon.name}</Typography></div>
                <br />
                <div className={classes.text}>Classification: {pokemon.classification}</div>
              </div>
              </div>
              <div className={classes.metaInfo}>
                <div className={classes.text}>Number: #{removeZeros(pokemon.number)}</div>
                <div className={classes.text}>Max Height: {pokemon.height.maximum}</div>
                <div className={classes.text}>Max Height: {pokemon.height.maximum}</div>
                <div className={classes.text}>Max Weight: {pokemon.weight.maximum}</div>
                <div className={classes.text}>Type: {pokemon.types[0]}</div>
              </div>
            </div>
          
          </DialogContent>
          <DialogActions>
            <Button sx={{'background': '#fff', color: '#333'}} variant="contained" onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
     }
    </>
      
    );
  };

  const useStyles = createUseStyles(
    {
      root: {
        background: '#FFF',
        borderRadius: '10px',
        padding: '10px'
      },

      upperContent: {
        display: 'flex'
      },

      name: {
        marginLeft: '20px'
      },

      text: {
        color: '#333'
      },

      image: {
        borderTopLeftRadius: '10px',
        width: '150px',
        height: '150px'
      },

      metaInfo: {
        display: 'flex',
        margin: '30px 0'
      }
      
    },
    { name: 'PokeSearch' }
  );