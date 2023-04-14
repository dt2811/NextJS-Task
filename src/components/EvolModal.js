import getEvolutionQuery from '@/graphqlFetching/getPokemonEvolution';
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import PokemonCards from './PokemonCards';
export default function EvolModal(props) {
  console.log(props.data);
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Evolutions in Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.data.map((data) => {
          return (
            <div>
              <PokemonCards image={data.image} name={data.name} number={data.number} id={data.id} types={data.types} />
            
            <br/>
            </div>);
        })}
      </Modal.Body>
    </Modal>
  )
}
