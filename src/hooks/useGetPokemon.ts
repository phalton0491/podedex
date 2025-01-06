import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

// added a new query for the pokemon modal
// here we are requesting a single pokemon based on id and name

// Question: Why are 2 parameters needed? Can't we still execute this query based on ID! only?
// I suppose the resolver may be set up this way?
export const GET_POKEMON = gql`
query pokemon($id: String, $name: String){
  pokemon(id: $id, name: $name){
    id
    number
    name
    weight{
      minimum
      maximum
    }
    height{
      minimum
      maximum
    }
    classification
    types
    resistant
    weaknesses
    fleeRate
    maxCP
    maxHP
    image
  }
}
`;

// data hook that executes the aboce query to recieve a single pokemon and return to the client
export const useGetPokemon = (id: string, name: string) => { 

    const { data, ...queryRes } = useQuery(GET_POKEMON, {
      variables: {
        id,
        name
      },
    });
  

    return {
        data,
        queryRes
    };
  };