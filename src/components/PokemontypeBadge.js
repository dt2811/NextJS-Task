import React from 'react'
import { Badge } from 'react-bootstrap'
export default function PokemontypeBadge(props) {
    const badgeStyle={
        "Fire":"#FFA500",
        "Water":"#00008b",
        "Normal":"#964b00",
        "Fighting":"#5A5A5A",
        "Grass":"#006600",
        "Poison":"#990099",
        "Ground":"#996633",
        "Bug":"#90EE90",
        "Flying":"#76d1e8",
        "Psychic":"#FFC0CB",
        "Ice":"#368BC1"
    }
    
  return (
    <Badge  style={{marginLeft:"10px",fontSize:"10px",marginTop:"5px",backgroundColor:badgeStyle[props.type]}} bg={badgeStyle[props.type]} >{props.type}</Badge>
  )
}
