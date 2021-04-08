import React from "react";

import { Nav, Navbar, NavDropdown, Image } from "react-bootstrap";

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { app } = this.props;
    return (
      <div className="navbarsomething">
        {/* make the color transparent in the future */}
        <Navbar expand="lg" style={{ backgroundColor: "#C3BEF7" }}>
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
              {/* Removed login from the nav bar */}
              {/* {!global.isLoggedIn ? (
                <Nav.Link href="/login">Login</Nav.Link>
              ) : (
                ""
              )} */}
              {/* I think the about page should also be moved to the footer */}
              <Nav.Link href="/about"> About </Nav.Link>
              {app.currUser
                ? app.currUser.admin
                  ? ((<Nav.Link href="/adminapps">Applications</Nav.Link>),
                    (<Nav.Link href="/postapet">Post a Pet</Nav.Link>))
                  : ((<Nav.Link href="/swiper">Pets</Nav.Link>),
                    (<Nav.Link href="/applications">Applications</Nav.Link>))
                : ""}
            </Nav>
            <Nav>
              {app.currUser ? (
                <NavDropdown
                  title={
                    <Image
                      width="30"
                      height="30"
                      src="/profile-icon.png"
                      roundedCircle
                      fluid
                    />
                  }
                  id="profile-dropdown"
                  img="/profile-icon.png"
                  drop="left"
                >
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                ""
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
