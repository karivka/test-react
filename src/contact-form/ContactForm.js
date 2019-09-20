import React from 'react';
import {Modal, Button} from 'react-bootstrap'
import PropTypes from "prop-types";
import ContactItem from "../contact-item/ContactItem";
class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            curContact: {
                firstName: "",
                lastName:"",
                phone: ""
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.show !== prevProps.show && this.props.show) {
            const {isNew, contact} = this.props;
            if(!isNew) {
                // update contact
                this.setState({
                    curContact: contact
                });
            } else {
                // new contact
                this.setState({
                    curContact: {
                        firstName: "",
                        lastName:"",
                        phone: ""
                    }
                });
            }
        }
    }

    handleSave = () => {
        const {isNew, contact} = this.props;
        const {curContact} = this.state;
        this.props.onShowChange(false);
        if(isNew) {
            this.props.onNewAdded(curContact);
        } else {
            this.props.onContactEdit(contact, curContact);
        }
    }

    handleClose = () => {
        this.props.onShowChange(false);
    }

    onChangeInput = (e) => {
        const inputName = e.target.name;
        const value = e.target.value;
        this.state.curContact[inputName] = value;
        this.setState({
            curContact: this.state.curContact
        });
    }

    render() {
        const {show, isNew} = this.props;
        const {curContact} = this.state;

        return (
            <Modal show={show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isNew ? 'Create new contact' : 'Edit contact'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                    <label>First Name</label>
                        <input className="form-control"  name="firstName" value={curContact.firstName} onChange={this.onChangeInput}/>
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input className="form-control" name="lastName" value={curContact.lastName}  onChange={this.onChangeInput}/>
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input className="form-control" name="phone" value={curContact.phone} onChange={this.onChangeInput}/>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

ContactItem.propTypes = {
    isNew: PropTypes.bool,
    show: PropTypes.bool,
    onShowChange: PropTypes.func,
    contact: PropTypes.object,
    onContactEdit: PropTypes.func,
    onNewAdded: PropTypes.func
};

export default ContactForm;
