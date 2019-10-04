import React from 'react';
import ContactItem from "../contact-item/ContactItem";
import {ListGroup} from "react-bootstrap"
import {Button} from "react-bootstrap"
import PropTypes from "prop-types";

class ContactList extends React.Component {
    componentDidMount() {
        console.log("I am mounted");
    }

    render() {
        const {onContactChange, contactList, onContactDelete} = this.props;
        const contactListContent = contactList.map(contact =>
            (<ListGroup.Item key={contact.firstName + contact.lastName}>
                <div className="row">
                    <ContactItem className="col-md-4" {...contact} ></ContactItem>
                    <div className="col-md-4">
                        <Button size="sm" className="mr-2" onClick={() => {
                            onContactChange(contact)
                        }}>Edit</Button>
                        <Button size="sm" variant="danger" onClick={() => {
                            onContactDelete(contact)
                        }}>Delete</Button>
                    </div>
                </div>
            </ListGroup.Item>)
        );
        return (
            <ListGroup>
                {contactListContent}
            </ListGroup>);
    }
}

ContactItem.propTypes = {
    onContactChange: PropTypes.func,
    onContactDelete: PropTypes.func,
    contactList: PropTypes.array
};

export default ContactList;
