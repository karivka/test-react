import React from 'react';
import PropTypes from 'prop-types';
import {Button} from "react-bootstrap"
import styles from "./ContactItem.module.css"

class ContactItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
    }

    expandHandler = () => {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }

    render() {
        const {firstName, lastName, phone} = this.props;
        const {expanded} = this.state;
        return (
            <div>
                <p>{firstName} {lastName} <Button size="sm"
                                                  onClick={this.expandHandler}>{expanded ? 'Collapse' : 'Expand'}</Button></p>
                {expanded && <p className={styles.class1}>{phone}</p>}
            </div>
        );
    }
}

ContactItem.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phone: PropTypes.string
};

export default ContactItem;
