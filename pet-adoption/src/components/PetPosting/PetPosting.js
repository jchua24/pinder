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
          this.state.breed.length > 0 &&
          !isNaN(parseInt(this.state.age))
        );
    }

    render(){
        return (
            <div className="petPosting">
                <Form>
                    <Form.Group controlId="affClinic">
                        <Form.Label>Affiliated Clinic</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder={this.props.clinic} 
                            readOnly 
                        />
                    </Form.Group>
                    <Form.Group controlId="petType">
                        <Form.Label>Pet Type</Form.Label>
                        <Form.Control 
                            as="select" 
                            custom
                            onChange={(e) => this.setState({type: e.target.value})}
                        >
                            <option value="">Choose..</option>
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="fish">Fish</option>
                            <option value="bird">Bird</option>
                            <option value="reptile">Reptile</option>
                            <option value="smallpet">Small Pet (Mouse, Hamster, Rabit, and etc.)</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="age">
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="text" placeholder="Please enter a valid number" />
                    </Form.Group>
                    <Form.Group controlId="addInfo">
                        <Form.Label>Additional Information</Form.Label>
                        <Form.Control as="textarea" rows={5} />
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default PetPosting;