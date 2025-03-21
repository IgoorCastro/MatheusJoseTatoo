import Image from "next/image";

const handleRedirect = (url: string) => {
    window.open(url, '_blank');
};

export default function Contato() {
    return (
        <div className="relative w-full h-full flex justify-center items-start">
            <div className="w-[70%] flex flex-col gap-5">
                <h4 className="py-10 text-center text-5xl">Contato</h4>
                <div className="flex flex-wrap flex-row justify-center items-center gap-10">                    
                    <Image
                        aria-hidden
                        src="/facebook-dark.svg"
                        alt="Facebook Icon"
                        width={90}
                        height={90}
                        className='w-[55px] h-[55px] md:w-[80px] md:h-[80px] transition-transform duration-300 hover:scale-125 cursor-pointer opacity-60'
                        onClick={() => handleRedirect('https://www.facebook.com/matheus.jose.9083')}
                    />

                    <Image
                        aria-hidden
                        src="/whatsapp-dark.svg"
                        alt="Whatsapp Icon"
                        width={90}
                        height={90}
                        className='w-[55px] h-[55px] md:w-[80px] md:h-[80px] transition-transform duration-300 hover:scale-125 cursor-pointer opacity-60'
                        onClick={() => handleRedirect('https://www.facebook.com/matheus.jose.9083')}
                    />

                    <Image
                        aria-hidden
                        src="/instagram-dark.svg"
                        alt="Instagram Icon"
                        width={90}
                        height={90}
                        className='w-[55px] h-[55px] md:w-[80px] md:h-[80px] transition-transform duration-300 hover:scale-125 cursor-pointer opacity-60'
                        onClick={() => handleRedirect('https://www.facebook.com/matheus.jose.9083')}
                    />

                    <Image
                        aria-hidden
                        src="/gmail-dark.svg"
                        alt="Gmail Icon"
                        width={90}
                        height={90}
                        className='w-[55px] h-[55px] md:w-[80px] md:h-[80px] transition-transform duration-300 hover:scale-125 cursor-pointer opacity-60'
                        onClick={() => handleRedirect('https://www.facebook.com/matheus.jose.9083')}
                    />
                </div>
            </div>
        </div>
    );
}