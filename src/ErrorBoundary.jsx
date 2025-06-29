import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', fontFamily: 'Arial', backgroundColor: '#fee', border: '1px solid #f00' }}>
          <h1>🚨 App Error Detected</h1>
          <p><strong>Error:</strong> {this.state.error?.message}</p>
          <details>
            <summary>Stack Trace</summary>
            <pre style={{ backgroundColor: '#f9f9f9', padding: '10px', overflow: 'auto' }}>
              {this.state.error?.stack}
            </pre>
          </details>
          <button onClick={() => window.location.reload()}>
            Reload App
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
