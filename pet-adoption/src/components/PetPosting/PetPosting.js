import React from "react";

import {Form} from "react-bootstrap";

class PetPosting extends React.Component{
    constructor(props){
        super();
        this.state = {
            age: "",
            breed: "",
            type: "",
            affClinic: this.props.clinic, 
            addInfo: ""
        }
    }
    render(){
        return (
            <Form>
                <Form.Group controlId="petType">
                    <Form.Label>Pet Type</Form.Label>
                    <Form.Control as="select" >
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
        );
    }
}