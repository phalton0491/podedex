import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

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