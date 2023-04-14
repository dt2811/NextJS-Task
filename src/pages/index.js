import getPokemonQuery from "@/graphqlFetching/getPokemons";
import { useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import PokemonCards from "@/components/PokemonCards";
import { Col, Container, Row } from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination';
export default function Home() {
  const [pageNo, setPageNo] = useState(1); // state for pagination
  const [pokemons, setPokemonData] = useState([]); // state for pokemondata
  const [isPageLoaded, setIsPageLoaded] = useState(false); // state for checking intital loading
  const { data: intitalData, loading: myloading, error: myerror } = useQuery(getPokemonQuery(), { variables: { first: 60 }, }); // query to call intitall static data
  const [getPokemons, { loading, data, error }] = useLazyQuery(getPokemonQuery(), { variables: { first: pageNo * 20 }, }); // query to call dynamic data


  function isEqual(a, b) { // check if two arrays are equal or not
    // If length is not equal
    if (a.length != b.length)
      return false;
    else {

      // Comparing each element of array
      for (var i = 0; i < a.length; i++)
        if (a[i] != b[i])
          return false;
      return true;
    }
  }

  function fetchPages(pageType) {
    if (pageType === "add") {
      if (pageNo !== 2 && pageNo !== 1)
        getPokemons(getPokemonQuery(), { variables: { first: pageNo * 20 }, });
      setPageNo(pageNo + 1);
    }
    else if (pageType === "subtract") {
      if (pageNo !== 1) {
        if (pageNo !== 2 && pageNo !== 3 && pageNo !== 4)
          getPokemons(getPokemonQuery(), { variables: { first: pageNo * 20 }, });
        setPageNo(pageNo - 1);
      }
    }
    else if (pageType === "1") {
      setPageNo(1);
    }
    else if (pageType === "2") {
      setPageNo(2);
    }
    else if (pageType === "3") {
      setPageNo(3);
    }

  }


  if (loading) {
    return <h2><a href="#loading" aria-hidden="true" className="aal_anchor" id="loading"><svg aria-hidden="true" className="aal_svg" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fillRule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Loading...</h2>;
  }
  else if (myerror) {
    console.error(error);
    return null;
  }
  else if (myloading) {
    return <h2><a href="#loading" aria-hidden="true" className="aal_anchor" id="loading"><svg aria-hidden="true" className="aal_svg" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fillRule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Loading...</h2>;
  }
  else if (error) {
    console.error(error);
    return null;
  }

  else if (data || intitalData) {
       
    if (intitalData.pokemons || data.pokemons) {

      if (isPageLoaded === true) {
        if (pageNo === 1 || pageNo == 2 || pageNo == 3) {

          const datas = Array.from(intitalData.pokemons).slice((pageNo - 1) * 20, pageNo * 20);

          if (isEqual(pokemons, datas) == false) {

            setPokemonData(datas);

          }
        }
        else {
          const datas = Array.from(data.pokemons).slice((pageNo - 1) * 20, pageNo * 20);
          if (isEqual(pokemons, datas) == false)
            setPokemonData(datas);
        }
      }
      else {

        const datas = Array.from(intitalData.pokemons).slice((pageNo - 1) * 20, pageNo * 20);

        if (isEqual(pokemons, datas) == false) {
          setPokemonData(datas);
          setIsPageLoaded(true);
        }

      }
    }


    return (<Container>
      <br />
      <h3>Pokemons</h3>

      {
        data || intitalData ? <Container><Row>{pokemons.map((data) => {
          return (<Col sm={6} md={3} style={{ marginTop: "1%" }} key={data.id}>
            <PokemonCards image={data.image} name={data.name} number={data.number} id={data.id} types={data.types} /> </Col>)
        })}</Row></Container>
          : null}
      <br />

      <Pagination size="md">
        <Pagination.Prev onClick={() => { fetchPages("subtract"); }} />
        <Pagination.Item active={pageNo === 1} onClick={() => { fetchPages("1"); }}>{1}</Pagination.Item>
        <Pagination.Item active={pageNo === 2} onClick={() => { fetchPages("2"); }} >{2}</Pagination.Item>
        <Pagination.Item active={pageNo === 3} onClick={() => { fetchPages("3"); }}>{3}</Pagination.Item>
        {pageNo !== 1 && pageNo !== 2 && pageNo !== 3 && pageNo !== 4 ? <Pagination.Item onClick={() => { fetchPages("subtract"); }}>{pageNo - 1}</Pagination.Item> : null}
        {pageNo !== 1 && pageNo !== 2 && pageNo !== 3 ? <Pagination.Item active={pageNo !== 1 && pageNo !== 2 && pageNo !== 3}>{pageNo}</Pagination.Item> : null}
        <Pagination.Next onClick={() => { fetchPages("add"); }} />
      </Pagination>



    </Container>);
  }

}




