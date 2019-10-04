import React from 'react';
import './App.css';
import ContactList from './contact-list/ContactList';
import Button from "react-bootstrap/Button";
import ContactForm from "./contact-form/ContactForm";
import HookComponent from "./HookComponent/HookComponent";
import LifecycleComponent from "./LifecycleComponent/LifecycleComponent";
import TestComponent from "./LifecycleComponent/TestComponent/TestComponent";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import wrapperComponent from "./WrapperComponent/WrapperComponent";

class App extends React.Component {
    state = {
        showContactForm: false,
        contact: {},
        contactList: [],
        isNew: false
    }

    constructor(props) {
        super(props);
    }

    static getDerivedStateFromError(error) {
        console.log("getDerivedStateFromError ", error);
        return null;
    }

    componentDidCatch(error, info) {
        console.log("[App] component did catch ", error);
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

    lifecycleClickHandler = () => {
        this.setState({
            contact: {}
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
                {contactList.length && <HookComponent prop1="some parent property"></HookComponent>}
                {contactList.length && <LifecycleComponent clicked={this.lifecycleClickHandler} prop1="1">
                <TestComponent/>
                </LifecycleComponent> }
                <ErrorBoundary><TestComponent/></ErrorBoundary>
            </div>
        );
    }
}

export default wrapperComponent(App);
