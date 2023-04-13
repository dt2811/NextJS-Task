import getPokemonQuery from "@/graphqlFetching/getPokemons";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import PokemonCards from "@/components/PokemonCards";
import { Col, Container, Row } from "react-bootstrap";
export default function Home() {

  const [getPokemons, { loading, data, error }] = useLazyQuery(getPokemonQuery(), { variables: { first: 60 }, });
  const [pageNo, setPageNo] = useState(1);
  const [pokemons, setPokemonData] = useState([]);

  useEffect(() => {
    getPokemons(getPokemonQuery(), { variables: { first: 60 }, });
  }, [])

  function isEqual(a,b)
    {    
      // If length is not equal
      if(a.length!=b.length)
       return false;
      else
      {
       
      // Comparing each element of array
       for(var i=0;i<a.length;i++)
       if(a[i]!=b[i])
        return false;
        return true;
      }
    }

  if (loading) {
    return <h2><a href="#loading" aria-hidden="true" className="aal_anchor" id="loading"><svg aria-hidden="true" className="aal_svg" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fillRule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

if(data){
  if(data){
    const datas=Array.from(data.pokemons);
       if(isEqual(pokemons,datas)==false )
       setPokemonData(datas);
  }
}

  return (<Container>
  <br/>
    <h3>Pokemons</h3>

    {
      data ? <Container><Row>{pokemons.map((data) => {
        return (<Col sm={6} md={3} style={{ marginTop: "1%" }}>
          <PokemonCards image={data.image} name={data.name} number={data.number} id={data.id} types={data.types} /> </Col>)
      })}</Row></Container>
        : null}</Container>);
}
