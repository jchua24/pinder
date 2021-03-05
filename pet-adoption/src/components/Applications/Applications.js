import React from "react";
import "./Applications.css";
import Pet from "../Pet";
import { uid } from 'react-uid'

class Applications extends React.Component {
  constructor(props) {
    super();
    this.state = {
      apps: [
        {name: "Biscuit", type: "Dog", breed: "Golden Retriever", imgSrc: "/dogo.jpeg", addInfo: "This is a lit puppy", comments: "I really like this dog!"},
        {name: "Pussy Cat", type: "Cat", breed: "Long Haired", imgSrc: "/cat1.jpg", addInfo: "CAT", comments: "He reminds me of my current cat. He'll make a great friend!"},
        {name: "Biscuit", type: "Dog", breed: "Golden Retriever", imgSrc: "/dogo.jpeg", addInfo: "This is a lit puppy", comments: "I really like this dog!"},
        
      ]
    }
  }
  removeApp (app) {
    const filteredApps = this.state.apps.filter((appList) =>{
      return appList != app
    })
    this.setState({
      apps: filteredApps
    })
  }

  render() {
    return (
      <div className = "Applications">
        <ul className="list">
          {
            this.state.apps.map((app) => {
              return(
              <li className = "item" key={uid(app)}>
                <Pet name={app.name} type={app.type} breed={app.breed} imgSrc={app.imgSrc} addInfo={app.addInfo} comments={app.comments} imgHeight='50%'/>
                <button onClick={() => this.removeApp(app)}> Remove Application </button>
              </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default Applications;
