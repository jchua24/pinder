import React from "react";
import { Row, Col, Image, Container, Figure } from "react-bootstrap";
class About extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Container className="about small">
        <Row className="justify-content-md-center">
          <h1>
            {" "}
            Created for the <br /> Introduction to Web Development Course
            (CSC309) <br /> at University of Toronto.
          </h1>{" "}
        </Row>
        <Container className="aboutImages">
          <Row className="justify-content-md-center">
            <Col xs={6} md={4}>
              <Figure>
                <Figure.Image
                  className="small"
                  src="ParsaTajik.jpeg"
                  fluid
                  roundedCircle
                  alt="Parsa Tajik"
                />
                <Figure.Caption className="aboutCaption">
                  Parsa Tajik
                </Figure.Caption>
              </Figure>
            </Col>
            <Col xs={6} md={4}>
              <Figure>
                <Figure.Image
                  className="small"
                  src="JoshuaChua.jpeg"
                  fluid
                  roundedCircle
                  alt="Joshua Chua"
                />
                <Figure.Caption className="aboutCaption">
                  Joshua Chua
                </Figure.Caption>
              </Figure>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs={6} md={4}>
              <Figure>
                <Figure.Image
                  className="small"
                  src="JimboXie.jpeg"
                  fluid
                  roundedCircle
                  alt="Jimbo Xie"
                />
                <Figure.Caption>
                  Jimbo Xie
                </Figure.Caption>
              </Figure>
            </Col>
            <Col xs={6} md={4}>
              <Figure>
                <Figure.Image
                  className="small"
                  src="BamdadSahraei.jpeg"
                  fluid
                  roundedCircle
                  alt="Bamdad Sahraei"
                />
                <Figure.Caption>
                  Bamdad Sahraei
                </Figure.Caption>
              </Figure>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

export default About;
