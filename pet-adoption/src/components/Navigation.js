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
                {/* make the color transparent in the future */}
                <Navbar expand="lg" style={{backgroundColor: '#C3BEF7'}}>
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
                            {!this.state.isLoggedIn ? <Nav.Link href="/Applications"> Applications </Nav.Link> : ""}
                            <Nav.Link href="/postapet">Pet Posting</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Navigation;