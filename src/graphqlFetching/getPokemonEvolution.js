import {gql } from "@apollo/client";
export default function getEvolutionQuery(){
    return gql`
    query pokemon($id: String, $name: String){
        pokemon(id: $id, name: $name){
          id
          number
          name
          image
          types
          evolutions{
            id
            number
            name
            image
            types
          }
        }
      }
`;
}
