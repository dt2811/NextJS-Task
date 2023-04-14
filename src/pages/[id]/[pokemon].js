import { useRouter } from 'next/router'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useLazyQuery, useQuery } from "@apollo/client";
import { useState } from 'react';
import getPokemonDetailQuery from '@/graphqlFetching/getPokemonDetail';
import getEvolutionQuery from '@/graphqlFetching/getPokemonEvolution';
import PokemontypeBadge from '@/components/PokemontypeBadge';
import { v4 as uuidv4 } from 'uuid';
import EvolModal from '@/components/EvolModal';
import WarningToast from '@/components/WarningToast';
export default function PokemonDetails() {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const id = router.query.id;
    var name = router.query.pokemon;
    const handleClose = () => setShow(false);
    const handleCloseToast = () => setShowToast(false);
    const { data, loading, error } = useQuery(getPokemonDetailQuery(), { variables: { id: id, name: name }, });
    const [getPokemonEvoultion, { loading: evolloading, data: evoldata, error: evolerror }] = useLazyQuery(getEvolutionQuery(), { variables: { id: id, name: name }, });

    function fetchEvolutions() {
        getPokemonEvoultion(getEvolutionQuery(), { id: id, name: name });
        if (evoldata) {
            if (evoldata.pokemon.evolutions && evoldata.pokemon.evolutions.length > 0) {
                let pokeData = Array.from(evoldata.pokemon.evolutions);
                pokeData = [{ name: name, id: id, image: data.pokemon.image, number: data.pokemon.number, types: data.pokemon.types }, ...pokeData];
                setModalData(pokeData)
                setShow(true);
            }
            else {
                setShowToast(true);
            }
        }
    }


    if (loading) {
        return <h2><a href="#loading" aria-hidden="true" className="aal_anchor" id="loading"><svg aria-hidden="true" className="aal_svg" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fillRule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Loading...</h2>;
    }

    if (error) {
        console.error(error);
        return null;
    }

    if (data) {

        return (
            <Container>
                <br />
                {show ? <EvolModal show={show} handleClose={handleClose} data={modalData} /> : null}
                {showToast ? <WarningToast showToast={showToast} handleCloseToast={handleCloseToast} /> : null}
                <Container>
                    {data.pokemon.name ? <center><h3 style={{ color: "#212121", fontSize: "30px" }}>{data.pokemon.name}</h3></center> : null}
                    <br />
                    <br />
                    <br />
                    <Row>
                        <Col> {data.pokemon.image ? <center><img src={data.pokemon.image} alt={name} style={{ height: "300px", width: "300px" }} /></center> : null}</Col>
                        <Col>
                            <Card style={{ backgroundColor: "#58b5db" }}>
                                <Card.Body>
                                    <Row>
                                        {data.pokemon.weight ? <Col>
                                            <h3 style={{ color: "#fff", fontSize: "18px" }}>Weight</h3>
                                            <h4 style={{ color: "#212121", fontSize: "20px" }}>{data.pokemon.weight.maximum}</h4>
                                        </Col> : null}
                                        {data.pokemon.height ? <Col>
                                            <h3 style={{ color: "#fff", fontSize: "18px" }}>Height</h3>
                                            <h4 style={{ color: "#212121", fontSize: "20px" }}>{data.pokemon.height.maximum}</h4>
                                        </Col> : null}
                                    </Row>
                                    <br />
                                    <Row>
                                        {data.pokemon.types ? <Col>
                                            <h3 style={{ color: "#fff", fontSize: "18px" }}>Type</h3>
                                            {data.pokemon.types ? <Row xs={3} sm={4} md={5}> {
                                                data.pokemon.types.map((type) => {
                                                    return (
                                                        <PokemontypeBadge key={uuidv4()} type={type} />
                                                    );

                                                })}
                                            </Row> : null}

                                        </Col> : null}
                                        {data.pokemon.classification ? <Col>
                                            <h3 style={{ color: "#fff", fontSize: "18px" }}>Classification</h3>
                                            <h4 style={{ color: "#212121", fontSize: "20px" }}>{data.pokemon.classification}</h4>
                                        </Col> : null}
                                    </Row>
                                    <br />
                                    <Row>
                                        {data.pokemon.resistant ? <Col>
                                            <h3 style={{ color: "#fff", fontSize: "18px" }}>Resistant</h3>
                                            {data.pokemon.resistant ? <Row xs={3} sm={4} md={5}> {
                                                data.pokemon.resistant.map((type) => {
                                                    return (
                                                        <div>
                                                            <PokemontypeBadge key={uuidv4()} type={type} />
                                                        </div>
                                                    );

                                                })}
                                            </Row> : null}

                                        </Col> : null}

                                        {data.pokemon.weaknesses ? <Col>
                                            <h3 style={{ color: "#fff", fontSize: "18px" }}>Weaknesses</h3>
                                            {data.pokemon.weaknesses ? <Row xs={3} sm={4} md={5}> {
                                                data.pokemon.weaknesses.map((type) => {
                                                    return (
                                                        <PokemontypeBadge key={uuidv4()} type={type} />
                                                    );

                                                })}
                                            </Row> : null}

                                        </Col> : null}

                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <br />
                <center><Button onClick={() => { fetchEvolutions(); }}>Evolutions</Button></center>
            </Container>
        )
    }
}
