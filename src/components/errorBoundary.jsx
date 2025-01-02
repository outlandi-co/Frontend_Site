import { Component } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error(error, info);
    }

    render() {
        if (this.state.hasError) {
            return <h2>Something went wrong. Please try again later.</h2>;
        }

        return this.props.children; // Render the children if no error
    }
}

// Add prop validation for children
ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,  // Validate children prop
};

export default ErrorBoundary;
