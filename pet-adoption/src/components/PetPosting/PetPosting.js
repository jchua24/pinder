import React from "react";
import {Form} from "react-bootstrap";

import "./PetPosting.css";
class PetPosting extends React.Component{
    constructor(props){
        super();
        this.state = {
            age: "",
            breed: "",
            type: "",
            addInfo: ""
        }
    }

    validateForm() {
        return (
          this.state.age.length > 0 &&
          this.state.breed.length > 0
        );
    }

    render(){
        return (
            <div className="petPosting">
                <Form>
                    <Form.Group controlId="petType">
                        <Form.Label>Pet Type</Form.Label>
                        <Form.Control 
                            as="select" 
                            custom
                            onChange={(e) => this.setState({type: e.target.value})}
                        >
                            <option value="">Chooes..</option>
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="fish">Fish</option>
                            <option value="bird">Bird</option>
                            <option value="reptile">Reptile</option>
                            <option value="smallpet">Small Pet (Mouse, Hamster, Rabit, and etc.)</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default PetPosting;