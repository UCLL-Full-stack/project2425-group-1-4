import './globals.css';
import React from 'react';
import LoginForm from '../components/LoginForm';
import { users } from '../dummydata/usersData';
import { useRouter } from 'next/router';

const LoginPage = () => {
    const router = useRouter();

    const handleLogin = (email: string, password: string) => {
        const user = users.find((u) => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('user', JSON.stringify(user));

            if (user.role === 'ADMIN') {
                router.push('/admin'); // Redirect for admin
            } else if (user.role === 'USER') {
                router.push('/'); // Redirect for user
            }
        }

        return user;
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 shadow-md rounded-md">
                <LoginForm onLogin={handleLogin} />
            </div>
        </div>
    );
};

export default LoginPage;
