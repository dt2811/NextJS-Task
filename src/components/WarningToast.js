import { ToastContainer } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';

function WarningToast(props) {


    return (
        <ToastContainer position='bottom-end'>
            <Toast bg='warning' onClose={props.handleCloseToast} show={props.showToast} delay={3000} autohide >
                <Toast.Body><p style={{color:"black",fontSize:"20px"}}>This Pokemon Doesnt evolve any further !</p></Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default WarningToast;