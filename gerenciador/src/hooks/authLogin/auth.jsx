import { createContext, useEffect, useState } from 'react';
import { api } from '../../services/apiService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);
    const [id, setId] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const loadingStoreData = async () => {
            const storageUser = localStorage.getItem('@Auth:user');
            const storageToken = localStorage.getItem('@Auth:token');
            const storageEmail = localStorage.getItem('@Auth:email');
            const storageId = localStorage.getItem('@Auth:id');

            if (storageUser) setUser(storageUser);
            if (storageToken) {
                api.defaults.headers.common['Authorization'] = `Bearer ${storageToken}`;
                setToken(storageToken);
            }
            if (storageEmail) setEmail(JSON.parse(storageEmail));
            if (storageId) setId(JSON.parse(storageId));
        };
        loadingStoreData();
    }, []);

    const signIn = async ({ email, senha }) => {
        try {
            const response = await api.post('/auth/login', {
                email: email,
                senha: senha
            });

            if (response.data && response.data.token) {
                const data = response.data;

                localStorage.setItem('@Auth:token', data.token);
                localStorage.setItem('@Auth:email', JSON.stringify(email));
                localStorage.setItem('@Auth:id', JSON.stringify(data.id));

                api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

                setEmail(email);
                setId(data.id);
                setToken(data.token);

                return data.token;
            } else {
                console.log('Erro: Token não encontrado na resposta', response.data);
            }
        } catch (error) {
            console.error('Erro ao fazer login.', error);
            alert('Erro ao tentar fazer login.');
        }
    };

    const signOut = () => {
        setUser(null);
        setEmail(null);
        setId(null);
        setToken(null);

        localStorage.removeItem('@Auth:email');
        localStorage.removeItem('@Auth:token');
        localStorage.removeItem('@Auth:user');
        localStorage.removeItem('@Auth:id');

        delete api.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, email, id, token, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
