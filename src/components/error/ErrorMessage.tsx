import './ErrorMessage.css';

interface IErrorMessageProps {
    msg: string,
    closeErr: () => void
}

const ErrorMessage = ({msg, closeErr}: IErrorMessageProps) => {
    return(
        <div className="error-container mb3 items-center justify-center pa2 pb3">
            <p className='error-cancel-btn pointer' onClick={closeErr}>X</p>
            <div>
                <span className="lh-title">{msg}</span>
            </div>
        </div>

    )
}

export default ErrorMessage;