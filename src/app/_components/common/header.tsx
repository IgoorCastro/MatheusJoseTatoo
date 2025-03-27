'use client'

import Image from 'next/image';
import Logo from '../ui/logo';
import '@/styles/globals.css';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const handleRedirect = (url: string) => {
    window.open(url, '_blank');
};

export default function Header() {

    const pathName = usePathname();
    const page = pathName || '';

    if(page.startsWith('/galeria')) return;

    return (
        <div className="relative h-80 w-full py-10 md:py-16 flex flex-row md:flex-col items-center justify-center gap-14 drop-shadow-md bg-[#242526]">
            <Logo onClick={() => window.location.href = '/'} />
            <div className='hidden md:flex flex-col gap-5'>
                <div className='flex justify-around gap-24 text-base md:text-4xl w-full h-full'>
                    <Link
                        className={`transition-opacity duration-300 ${page === '' || !page ? "opacity-100" : "opacity-40"} cursor-pointer`}
                        href="/"
                    >Portfólio</Link>
                    <a
                        className={`transition-opacity duration-300 ${page === 'sobre' ? "opacity-100" : "opacity-40"} cursor-pointer`}
                        href="?page=sobre"
                    >Sobre</a>
                    <a
                        className={`transition-opacity duration-300 ${page === 'contato' ? "opacity-100" : "opacity-40"} cursor-pointer`}
                        href="?page=contato"
                    >Contato</a>
                </div>
                <div className='flex justify-center gap-5'>
                    <Image
                        aria-hidden
                        src="/facebook.svg"
                        alt="Facebook icon"
                        width={25}
                        height={25}
                        className="transition-transform duration-300 hover:scale-125 cursor-pointer"
                        onClick={() => handleRedirect('https://www.facebook.com/matheus.jose.9083')}
                    />
                    <Image
                        aria-hidden
                        src="/instagram.svg"
                        alt="Instagram icon"
                        width={25}
                        height={25}
                        className="transition-transform duration-300 hover:scale-125 cursor-pointer"
                        onClick={() => handleRedirect('https://www.instagram.com/matheusjose_tattoo/')}
                    />
                </div>
            </div>

            <div className='absolute right-0 m-[40px] flex md:hidden'>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Image
                            aria-hidden
                            src="/menu.svg"
                            alt="Menu icon"
                            width={35}
                            height={35}
                            className="transition-transform duration-300 hover:scale-125 cursor-pointer"
                        />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => window.location.href = '/'}>Home</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => window.location.href = '?page=sobre'}>Sobre</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => window.location.href = '?page=contato'}>Contato</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </div>
    );
}