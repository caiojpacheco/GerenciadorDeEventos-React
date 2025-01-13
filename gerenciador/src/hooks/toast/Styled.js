import styled, {keyframes} from 'styled-components';

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const ToastContainer = styled.div`
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: white;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    max-width: 400px;
    width: 100%;
    margin: 10px;
    z-index: 9999;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    opacity: 0;
    animation: ${fadeIn} 0.5s forwards;
`;

export const ToastContent = styled.div`
    color: white;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const CloseButton = styled.button`
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
`;

const success = '#4CAF50';
const error = '#f44336';
const warning = '#ff9800';
const info = '#2196F3';

export const getToastBackground = (type) => {
    switch (type) {
        case 'success':
            return success;
        case 'error':
            return error;
        case 'warning':
            return warning;
        case 'info':
            return info;
        default:
            return '#333';
    }
};