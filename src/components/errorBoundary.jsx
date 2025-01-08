// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for type-checking

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    // Update state when an error occurs
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    // Log error details for debugging
    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
                    <h2>Something went wrong. Please try again later.</h2>
                    {this.state.error && (
                        <details style={{ whiteSpace: 'pre-wrap' }}>
                            {this.state.error.toString()}
                            {this.state.errorInfo?.componentStack}
                        </details>
                    )}
                </div>
            );
        }

        // Render children if no error occurred
        return this.props.children;
    }
}

// Add prop validation for children
ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired, // Validate children as required
};

export default ErrorBoundary;
