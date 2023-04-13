import { Badge,Button,Card,Row } from 'react-bootstrap';

function PokemonCards(props) {

    const badgeStyle={
    "Fire":"#FFA500",
    "Water":"#00008b",
    "Normal":"#964b00",
    "Fighting":"#5A5A5A",
    "Grass":"#006600",
    "Poison":"#990099",
    "Ground":"#996633",
    "Bug":"#90EE90",
    "Flying":"#76d1e8"
}
    return (

        <Card style={{cursor:"pointer"}}onClick={()=>{console.log("HELLO");}}>
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
                        <Badge  style={{marginLeft:"10px",backgroundColor:badgeStyle[type]}} bg={badgeStyle[type]} > {type}</Badge>
                    );
                    
                })}
                </Row>:null}
                <br/>
            </Card.Body>
        </Card>
    )
}

export default PokemonCards