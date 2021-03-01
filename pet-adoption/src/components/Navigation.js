import React from "react";

import {Nav, Navbar} from "react-bootstrap";

class Navigation extends React.Component{
    constructor(){
        super();
        this.state = {
            isLoggedIn : false
        };
    }
    render(){
        return (
            <div className="navbarsomething">
                {/* make the color transparent for the future */}
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">
                        <img
                            src="/dog-icon.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt=""
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {!this.state.isLoggedIn ? <Nav.Link href="/login">Login</Nav.Link> : ""}
                            <Nav.Link href="/about"> About </Nav.Link>
                        </Nav>
                        <Nav className="mr-auto">
                            <Nav.Link href="/signup">Sign Up</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Navigation;