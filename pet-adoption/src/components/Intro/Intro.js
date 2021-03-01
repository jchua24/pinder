import React from "react";
import { Carousel, CardDeck } from "react-bootstrap";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import Pet from "../Pet";
import "./Intro.css";
  
class Intro extends React.Component {
  constructor() {
      super();
  }
  render() {
    return (
        <div className="intro">
          <Carousel indicators={false}>
            <Carousel.Item interval={2000}>
              <CardDeck>
                <Pet name="Biscuit" type="Dog" breed="Golden Retriever" imgSrc="/dogo.jpeg" addInfo="This is a lit puppy"/>
                <Pet name="Pussy Cat" type="Cat" breed="Long Haired" imgSrc="/cat1.jpg" addInfo="PUSSY CAT"/>
                <Pet name="Big Boi" type="Dog" breed="Samoyed" imgSrc="/bigb.jpg" addInfo="The BIGGEST BOI you can find"/>
              </CardDeck>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <CardDeck>
                <Pet name="Biscuit" type="Dog" breed="Golden Retriever" imgSrc="/cat1.jpg"/>
                <Pet name="Pussy Cat" type="Cat" breed="Long Haired" imgSrc="/cat1.jpg"/>
                <Pet name="Big Boi" type="Dog" breed="Samoyed" imgSrc="/cat1.jpg"/>
              </CardDeck>
            </Carousel.Item>
          </Carousel>
        </div>
    );
  }
}

export default Intro;

// should this page include the routing to login and sign up or App?
