import {createContext, useState, useContext, useEffect} from 'react';
const ToastContext = createContext();

export const useToast = () => {
    return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => {
                setToast(null);
            }, toast.duration);

            return () => clearTimeout(timer);
        }
    }, [toast]);

    const showToast = (message, type = 'success', duration = 3000) => {
        setToast({ message, type, duration });
    };

    const hideToast = () => {
        setToast(null);
    };

    return (
        <ToastContext.Provider value={{ toast, showToast, hideToast }}>
            {children}
        </ToastContext.Provider>
    );
};