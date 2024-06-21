
'use client'
import { ReactNode } from 'react';
import Header from './Header/Header';
 

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <footer className="bg-gray-800 text-white text-center p-4">
                &copy; 2024 My Company
            </footer>
        </div>
    );
};

export default Layout;