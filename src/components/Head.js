import Head from 'next/head'
export default function CustomHead() {
    return (<Head>
        <title>My PokeDex | Dhrumil's PokeDex</title>
        <meta name="description" content="Dhrumil's PokeDex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
    </Head>);
}