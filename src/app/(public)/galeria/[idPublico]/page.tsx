'use client'

import { useEffect, useState } from "react";
import { getTrabalhoByIdPublic, DataSchema } from "@/app/constants/data";

import Slider from "@/app/components/ui/slider";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

// async function getImagesByCollection(id: string): Promise<StaticImageData[]> {
//     const res = await fetch(`caminho/${id}`);
//     if (!res.ok) return [];
//     return res.json();
// }



export default function CollectionPage() {
    const params = useParams();
    const [trab, setTrab] = useState<DataSchema | null>(null);
    // const [imgs, setImgs] = useState<StaticImageData[] | null>(null);

    const router = useRouter();

    const handleClick = () => {
        return window.history.length > 2 ? router.back() : router.push("/");         
    }

    useEffect(() => {
        if (Array.isArray(params) && !params.idPublico) return;

        const currentItem = getTrabalhoByIdPublic(Array.isArray(params.idPublico) ? params.idPublico[0] : params.idPublico);
        setTrab(currentItem ? currentItem : null);
    }, [params]);

    if (!trab) return <div className="absolute w-screen h-screen bg-slate-500"><p>Carregando...</p></div>;
    if (!trab.imagens) return <div className="absolute w-screen h-screen bg-slate-500"><p>Coleção não encontrada</p></div>;

    return (
        <div className="relative w-screen h-screen flex flex-col justify-end md:justify-center items-center gap-15 bg-[#242526]">
            {/* <h1 className="text-center text-2xl font-bold mb-4">Coleção {params.id}</h1> */}
            <div className="absolute z-10 left-6 top-3 h-12 w-auto aspect-square p-2 border-2 border-slate-200 rounded-[50%] cursor-pointer hover:bg-[#ffffff10]"
                onClick={handleClick}
            >
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#E2E8F0" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z" />
                </svg>
            </div>
            <Slider item={trab} />
        </div>
    );
}
