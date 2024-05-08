import { Component, ReactNode, ErrorInfo } from "react";

export interface ErrorBoundaryProps {
  children: ReactNode;
  title?: string;
  message?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
    // eslint-disable-next-line no-console
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    const {
      state: { hasError, error, errorInfo },
      props: { title = "Something went wrong", message = "Error", children },
    } = this;

    if (hasError) {
      return (
        <div>
          {title}
          {message}
          {error?.message}
          {errorInfo?.componentStack}
        </div>
      );
    }

    return children;
  }
}

export { ErrorBoundary };
