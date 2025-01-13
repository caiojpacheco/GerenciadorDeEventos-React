import { useState, useEffect } from 'react';
import {CloseButton, getToastBackground, ToastContainer, ToastContent} from "./Styled.js";
import {useToast} from "./ToastProvider.jsx";

const Toast = () => {
    const { toast, hideToast } = useToast();
    const [show, setShow] = useState(true);

    useEffect(() => {
        if (toast) {
            setShow(true);

            const timer = setTimeout(() => {
                setShow(false);
                hideToast();
            }, toast.duration);

            return () => clearTimeout(timer);
        }
    }, [toast, hideToast]);

    if (!toast || !show) return null;

    return (
        <ToastContainer style={{ backgroundColor: getToastBackground(toast.type) }}>
            <ToastContent>
                <span>{toast.message}</span>
            </ToastContent>
            <CloseButton onClick={() => {
                setShow(false)
                hideToast()
            }}>X</CloseButton>
        </ToastContainer>
    );
};

export default Toast;