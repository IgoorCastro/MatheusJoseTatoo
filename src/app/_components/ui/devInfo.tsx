'use client'

import { usePathname } from "next/navigation";

export default function DevInfo() {
    const pathName = usePathname();
    const page = pathName || '';
    if (page.startsWith('/galeria')) return;
    return(
        <p className="py-3">Desenvolvido por: <a href="https://github.com/IgoorCastro" target="_blank" className="text-[#242526]">Igor Castro</a></p>
    );
}