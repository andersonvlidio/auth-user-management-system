import React, { useState } from 'react';
import Login from '../componens/Login';
import Register from '../componens/Register';

const Home = () => {
    const [showRegister, setShowRegister] = useState(false);

    return (
        <div className="container mt-5">
            {showRegister ? (
                <>
                    <Register />
                    <p className="mt-3 text-center">
                        Já tem uma conta?{' '}
                        <button className="btn btn-link p-0" onClick={() => setShowRegister(false)}>
                            Faça login
                        </button>
                    </p>
                </>
            ) : (
                <>
                    <Login />
                    <p className="mt-3 text-center">
                        Ainda não tem uma conta?{' '}
                        <button className="btn btn-link p-0" onClick={() => setShowRegister(true)}>
                            Registre-se
                        </button>
                    </p>
                </>
            )}
        </div>
    );
};

export default Home;
