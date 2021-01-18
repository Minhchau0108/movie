import React from 'react'
import {Modal, Button,Accordion, Card} from "react-bootstrap"
import { FaUserAlt} from "react-icons/fa";
import { IconContext } from "react-icons";

const ModalReviews = (props) => {
  
    return (
        <Modal {...props} size="lg" centered>
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                   Movies Reviews
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Accordion defaultActiveKey="0">
                    {props.reviews.map(r => (
                    <Card key={r.id}>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey={r.id}>
                           <IconContext.Provider value={{ color: "blue", size: "1.5em", className: "react-icons"}}>
                                <div>
                                <FaUserAlt/><span className="m-2">{r.author}</span>
                                </div>
                            </IconContext.Provider>
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={r.id}>
                        <Card.Body>{r.content.substring(0,300)}</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    ))}
                 
                </Accordion>
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
      </Modal>
    )
}

export default ModalReviews
