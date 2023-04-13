import { useRouter } from 'next/router'
import React from 'react'

export default function PokemonDetails() {
    const router=useRouter();
    const id=router.query.id;
    const name=router.query.pokemon;
  return (
    <div>PokemonDetails{id}{name}</div>
  )
}
