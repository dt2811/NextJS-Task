import {gql } from "@apollo/client";

export default function getPokemonQuery(){
return gql`
query pokemons($first: Int!){
  pokemons(first: $first){
    id
    number
    name
    types
    image
  }
}
`;
}