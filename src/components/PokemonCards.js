import {Card,Row } from 'react-bootstrap';
import { useRouter } from 'next/router'
import PokemontypeBadge from './PokemontypeBadge';
import { v4 as uuidv4 } from 'uuid';
function PokemonCards(props) {
const router=useRouter();
const url="/"+props.id+"/"+props.name;
    return (

        <Card style={{cursor:"pointer"}}onClick={()=>{router.push(url)}}>
            {props.image ? <center><Card.Img src={props.image} style={{ width: "100px", height: "100px",marginTop:"4px" }}></Card.Img> </center>: <></>}
            <br/>
            <Card.Body>
            <Card.Text style={{marginTop:"-5px"}}>
                    # {props.number ? props.number : "ID"}
                </Card.Text>
                
                
                <Card.Title style={{marginTop:"-20px"}}>
                    {props.name ? props.name : "Unknown"}
                </Card.Title>
                {props.types?<Row xs={3} sm={4} md={4}> {
                    props.types.map((type)=>{
                    return(
                        <PokemontypeBadge key={uuidv4()} type={type}/>
                    );
                    
                })}
                </Row>:null}
                <br/>
            </Card.Body>
        </Card>
    )
}

export default PokemonCards