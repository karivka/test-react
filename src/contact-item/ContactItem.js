import React from 'react';
import PropTypes from 'prop-types';
import {Button} from "react-bootstrap"

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

    render() {
        const {firstName, lastName, phone} = this.props;
        const {expanded} = this.state;
        return (
            <div>
                <p>{firstName} {lastName} <Button size="sm"
                                                  onClick={this.expandHandler}>{expanded ? 'Collapse' : 'Expand'}</Button></p>
                {expanded && <p>{phone}</p>}
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
