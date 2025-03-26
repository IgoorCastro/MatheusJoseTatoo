'use client'
import { DataSchema } from "@/app/constants/data";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
// import { Buffer } from "buffer";

export async function getCollectionNormalized(item: DataSchema) {
    const normalizedPath = (path: string) => path.replace(/\\/g, '/'); 
    if(item.colecao !== undefined && item.capa !== item.colecao[0])   
        item.colecao?.unshift(item.capa);

    const path = item.colecao?.map(item => normalizedPath(item));
    return path?.map(item => item.replace('public/', ''));
};

export default function Slider({ item }: { item: DataSchema }) {
    console.log('item: ', item)
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [collectionNormalized, setCollectionNormalized] = useState<string[]>([]);

    useEffect(() => {
        getCollectionNormalized(item).then(data => setCollectionNormalized(data ?? []));
    }, [item]);

    if(!item) return <div className="absolute w-screen h-screen bg-slate-500"><p>Carregando...</p></div>;

    return (
        <div className="w-full h-full rounded-sm">
            {collectionNormalized && (
                <div className="w-full h-full flex flex-col sm:flex-row">
                    <div className="relative w-full h-full flex flex-row items-center gap-16 bg-black">
                        {currentIndex > 0 && (
                            <div
                                className="absolute left-0 z-10 flex justify-center items-center h-full px-2 md:px-4 cursor-pointer"
                                onClick={() => setCurrentIndex((prevStatus) => Math.min(prevStatus - 1))}
                            >
                                <ChevronLeftCircle 
                                    color="rgba(241, 245, 249, 0.8)"
                                    className="size-10 md:size-12 transition-transform duration-500 ease-in-out hover:translate-x-[-4px]"
                                />
                            </div>
                        )}

                        <Image
                            src={`/${collectionNormalized[currentIndex]}` || "/default-image.jpg"}
                            alt=""
                            fill
                            className="object-contain"
                            sizes="auto"
                        />

                        {item.colecao && currentIndex < collectionNormalized.length - 1 && (
                            <div
                            className="absolute right-0 z-10 flex justify-center items-center h-full px-2 md:px-4 cursor-pointer"
                            onClick={() => setCurrentIndex((prevStatus) => Math.min(prevStatus + 1))}
                        >
                            <ChevronRightCircle 
                                color="rgba(241, 245, 249, 0.8)"
                                className="size-10 md:size-12 transition-transform duration-500 ease-in-out hover:translate-x-[-4px]"
                            />
                        </div>
                        )}
                    </div>

                    <div className="h-full w-full sm:w-[30%] px-2 md:px-5 py-3 md:py-8 flex flex-col gap-4 md:gap-5">
                        <h3 className="ml-2 text-slate-300">{item.titulo}</h3>
                        <div className="flex justify-start items-start p-3 bg-[#353738] rounded-lg">
                            <p className="text-slate-200">{item.descricao}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}