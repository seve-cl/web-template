import React, { useState } from 'react';
import { Lock } from 'lucide-react';

const AdminLogin = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock authentication - simple password check
        if (password === 'admin123') {
            onLogin();
        } else {
            setError(true);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-secondary">Acceso Administrativo</h2>
                    <p className="text-gray-500">Ingresa tu contraseña para continuar</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${error ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError(false);
                            }}
                        />
                        {error && <p className="text-red-500 text-sm mt-2 ml-1">Contraseña incorrecta</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-opacity-90 text-white font-bold py-3 rounded-xl transition-all hover:scale-[1.02]"
                    >
                        Ingresar
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    <p>Contraseña demo: admin123</p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
