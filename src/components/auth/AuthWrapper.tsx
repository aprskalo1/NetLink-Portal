import React, {useEffect, useState} from 'react';

interface AuthWrapperProps {
    title: string;
    children: React.ReactNode;
}

const AuthWrapper = ({title, children}: AuthWrapperProps) => {
    const [theme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.querySelector('html')?.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-200">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <p className="text-4xl font-bold text-center mb-5">{title}</p>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthWrapper;
