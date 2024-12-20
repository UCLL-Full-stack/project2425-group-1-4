import React, { useState } from 'react';

// Define the onLogin function type
type LoginFormProps = {
    onLogin: (email: string, password: string) => { role: string } | null;
};

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const user = onLogin(email, password);

        if (!user) {
            setError('Invalid email or password.');
        } else {
            setError('');
            console.log(`Logged in as ${user.role}`);
        }
    };

    return (
        <form onSubmit={handleLogin} className="flex flex-col gap-4 p-6">
            <h1 className="text-2xl font-bold">Login</h1>
            {error && <p className="text-red-500">{error}</p>}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 rounded"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
                Login
            </button>
        </form>
    );
};

export default LoginForm;
