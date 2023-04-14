import {gql } from "@apollo/client";

export default function getPokemonDetailQuery(){
return gql`
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
      image
    }
  }

`;
}