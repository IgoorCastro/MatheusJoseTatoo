'use client'

import { useState, useEffect } from "react";

const Loading = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return oldProgress + 15; // Aumenta a barra gradativamente
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-screen h-screen">
            {/* Barra de progresso */}
            <div className="h-2 bg-blue-500 transition-all duration-100" style={{ width: `${progress}vw` }} />
        </div>
    );
};

export default Loading;
