import React from "react";
import { Carousel, CardDeck } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Pet from "../Pet/Pet";
import "./Intro.css";

class Intro extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="intro">
        <div className="introText">
          <h1>Welcome to Pinder!</h1>
          <h2>
            The best pet adoption platform on the internet.
          </h2>
          <h3>
            Please{" "}
            <a style={{ color: "#C3BEF7" }} href="/login">
              login
            </a>{" "}
            or{" "}
            <a style={{ color: "#C3BEF7" }} href="/signup">
              create an account
            </a>
            !
          </h3>
        </div>
        <br></br>
        <Carousel indicators={false} className="introCarousel">
          <Carousel.Item interval={2000}>
            <CardDeck>
              <Pet
                name="Biscuit"
                type="Dog"
                breed="Golden Retriever"
                imgSrc="/dogo.jpeg"
                addInfo="This is a lit puppy"
              />
              <Pet
                name="Pussy Cat"
                type="Cat"
                breed="Long Haired"
                imgSrc="/cat1.jpg"
                addInfo="PUSSY CAT"
              />
              <Pet
                name="Big Boi"
                type="Dog"
                breed="Samoyed"
                imgSrc="/bigb.jpg"
                addInfo="The BIGGEST BOI you can find"
              />
              {/* <Pet name="RR" type="Small Pet" breed="Something" imgSrc="/pari-hamster.jpg" addInfo="Interesting" /> */}
            </CardDeck>
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <CardDeck>
              <Pet
                name="Chami"
                type="Reptile"
                breed="XYZ"
                imgSrc="/chami-reptile.jpeg"
              />
              <Pet
                name="Nosey"
                type="Fish"
                breed="YYZ"
                imgSrc="/nosey-fish.jpg"
              />
              <Pet
                name="Pari"
                type="Small Pet"
                breed="Hamster"
                imgSrc="/pari-hamster.jpg"
              />
            </CardDeck>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

export default Intro;
