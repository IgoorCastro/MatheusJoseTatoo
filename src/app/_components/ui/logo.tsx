'use client'

import '@/styles/globals.css';

interface LogoProps{
    onClick: () => void;
}

export default function Logo({onClick}: LogoProps) {
    return(
        <div className="w-min h-min flex flex-col justify-center items-center text-[#E4E6EB] cursor-pointer" onClick={onClick}>
            <h1 className="text-xl md:text-4xl whitespace-nowrap text-[#E4E6EB]" style={{ fontFamily: "Platypi, sans-serif" }}>Matheus José</h1>
            <h1 className="text-lg md:text-2xl whitespace-nowrap uppercase text-[#E4E6EB]" style={{ fontFamily: "NovaCut, sans-serif" }}>Tatoo</h1>
        </div>
    );
}