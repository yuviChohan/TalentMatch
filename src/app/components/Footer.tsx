import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Footer: React.FC = () => {
    const { textColor } = useTheme();
//Footer color update
    return (
        <footer className={`bg-blue-900 p-4 text-center text-${textColor}`}>
            <div className="container mx-auto">
                <p>© 2024 SHIFTSIXOS. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
