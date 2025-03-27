import Image from "next/image";

const handleRedirect = (url: string) => {
    window.open(url, '_blank');
};

const iconStyle = 'w-[50px] h-[50px] md:w-[80px] md:h-[80px] opacity-80 transition-all duration-500 hover:opacity-100 hover:scale-125 cursor-pointer ';

export default function Contato() {
    return (
        <div className="w-[70%] flex flex-col gap-2">
            <h1 className="py-10 md:py-12 text-center">Contato</h1>
            <div className="flex flex-wrap flex-row justify-center items-center gap-10 ">
                <Image
                    aria-hidden
                    src="/facebook-dark.svg"
                    alt="Facebook Icon"
                    width={90}
                    height={90}
                    className={iconStyle}
                    onClick={() => handleRedirect('https://www.facebook.com/matheus.jose.9083')}
                />

                <Image
                    aria-hidden
                    src="/whatsapp-dark.svg"
                    alt="Whatsapp Icon"
                    width={90}
                    height={90}
                    className={iconStyle}
                    onClick={() => handleRedirect('https://www.facebook.com/matheus.jose.9083')}
                />

                <Image
                    aria-hidden
                    src="/instagram-dark.svg"
                    alt="Instagram Icon"
                    width={90}
                    height={90}
                    className={iconStyle}
                    onClick={() => handleRedirect('https://www.facebook.com/matheus.jose.9083')}
                />

                <Image
                    aria-hidden
                    src="/gmail-dark.svg"
                    alt="Gmail Icon"
                    width={90}
                    height={90}
                    className={iconStyle}
                    onClick={() => handleRedirect('https://www.facebook.com/matheus.jose.9083')}
                />
            </div>
            <p className="text-center">Entre em contato selecionando uma das opções acima</p>
        </div>
    );
}