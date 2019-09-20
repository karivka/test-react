import React from 'react';
import './App.css';
import ContactList from './contact-list/ContactList';
import Button from "react-bootstrap/Button";
import ContactForm from "./contact-form/ContactForm";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showContactForm: false,
            contact: {},
            contactList: [],
            isNew: false
        }
    }

    openNewContact = () => {
        this.setState({
            showContactForm: true,
            isNew: true
        });
    }

    showContactFormHandler = (val) => {
        this.setState({
            showContactForm: val
        });
    }

    onContactChange(contact) {
        this.setState({
            showContactForm: true,
            isNew: false,
            contact: contact
        });
    }

    onContactDelete(contact) {
        console.log("delete", contact);
        const modifiedList = this.state.contactList.slice();
        const index = modifiedList.indexOf(contact);
        modifiedList.splice(index, 1);
        this.setState({
            contactList: modifiedList
        });
    }

    onContactAdded(contact) {
        console.log("added", contact);
        const modifiedList = this.state.contactList.slice();
        modifiedList.push(contact);
        this.setState({
            contactList: modifiedList
        });
    }

    onContactEdit(contact, updatedContact) {
        const modifiedList = this.state.contactList.slice();
        modifiedList.some(contactItem => {
            if(contactItem === contact) {
                Object.assign(contactItem, updatedContact);
                return true;
            }
        });
        this.setState({
            contactList: modifiedList
        });
    }


    render() {
        const {showContactForm, isNew, contact, contactList } = this.state;
        return (
            <div className="App">
                <h2>Contacts</h2>
                <div className="nav-bar"><Button size="sm" onClick={this.openNewContact}>Add contact</Button></div>
                <div className="contact-list"><ContactList contactList={contactList} onContactChange={this.onContactChange.bind(this)} onContactDelete={this.onContactDelete.bind(this)}></ContactList></div>

                <ContactForm contact={contact} show={showContactForm} isNew={isNew} onShowChange={this.showContactFormHandler} onNewAdded={this.onContactAdded.bind(this)} onContactEdit={this.onContactEdit.bind(this)}></ContactForm>
            </div>
        );
    }
}

export default App;
