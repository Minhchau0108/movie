import React from 'react'
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">
            <img
                src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"
                width="100"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
            />
            </Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              NOW PLAYING
            </Nav.Link>
            <Nav.Link as={Link} to="/movies/top_rated">
              TOP RATED
            </Nav.Link>
            <Nav.Link as={Link} exact to="/movies/upcoming">
              UPCOMING
            </Nav.Link>
            </Nav>
        </Navbar>
      </>
    )
}

export default NavBar