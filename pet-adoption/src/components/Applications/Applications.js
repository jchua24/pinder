import React from "react";

import "./Applications.css";
import Pet from "../Pet";

class Applications extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className = "Applications">
        <Pet name="Biscuit" type="Dog" breed="Golden Retriever" imgSrc="/dogo.jpeg" addInfo="This is a lit puppy"/>
        <Pet name="Pussy Cat" type="Cat" breed="Long Haired" imgSrc="/cat1.jpg" addInfo="PUSSY CAT"/>
        {/*<Pet name="Big Boi" type="Dog" breed="Samoyed" imgSrc="/bigb.jpg" addInfo="The BIGGEST BOI you can find"/>*/}
      </div>
    );
  }
}

export default Applications;
