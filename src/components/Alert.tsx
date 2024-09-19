interface AlertProps {
    message: string;
    type: 'error' | 'success' | 'warning' | 'info'; // Alert types based on DaisyUI classes
}

const Alert = ({message, type}: AlertProps) => {
    const alertClass = `alert alert-${type} mb-4`;

    return (
        <div role="alert" className={alertClass}>
            <span>{message}</span>
        </div>
    );
};

export default Alert;