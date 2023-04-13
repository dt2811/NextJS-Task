const { Navbar,Container } = require("react-bootstrap");

function CustomNavbar(){
    return(
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="../Pokeball.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            PokeDex
          </Navbar.Brand>
        </Container>
      </Navbar>
    );
}

export default CustomNavbar;