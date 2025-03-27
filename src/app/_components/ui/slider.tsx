'use client'
import { DataSchema } from "@/app/constants/data";
import { ChevronLeftCircle, ChevronRightCircle, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
// import { Buffer } from "buffer";

export async function getCollectionNormalized(item: DataSchema) {
    const normalizedPath = (path: string) => path.replace(/\\/g, '/');
    if (item.colecao !== undefined && item.capa !== item.colecao[0]) item.colecao?.unshift(item.capa);

    const path = item.colecao?.map(item => normalizedPath(item));
    return path?.map(item => item.replace('public/', ''));
};

export default function Slider({ item }: { item: DataSchema }) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [collectionNormalized, setCollectionNormalized] = useState<string[]>([]);

    useEffect(() => {
        getCollectionNormalized(item).then(data => setCollectionNormalized(data ?? []));
    }, [item]);

    const getData = (): string => {
        const date = new Date(item.data);
        const rData = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
        return rData || '';
    }

    if (!item) return <div className="absolute w-screen h-screen bg-slate-500"><p>Carregando...</p></div>;

    return (
        <div className="w-[95%] h-[95%] rounded-md border border-slate-600">
            {collectionNormalized && (
                <div className="w-full h-full flex flex-col sm:flex-row rounded-md">
                    <div className="relative w-full h-full flex flex-row items-center gap-16 bg-black rounded-l-md">

                        <div className="absolute z-20 top-0 w-full flex py-4 pl-4">
                            <Link href="/" className="h-min aspect-square p-1.5 border border-slate-200 rounded-[50%] cursor-pointer bg-[#00000096] hover:bg-[#ffffff10]">
                                {/* <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#E2E8F0" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z" />
                    </svg> */}
                                <X
                                    color="rgba(226, 232, 240, 0.9)"
                                    className="size-6"
                                />
                            </Link>
                        </div>
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

                    <div className="h-[50%] sm:h-full w-full sm:w-[30%] px-4 md:px-7 py-3 md:py-8 flex flex-col gap-4 md:gap-5">
                        <div className=" w-full h-min">
                            <h2 className="text-slate-300">{item.titulo}</h2>
                            <p className="text-slate-300">{getData()}</p>
                        </div>

                        {item.descricao && (
                            <div className="flex justify-start items-start p-3 bg-[#353738] rounded-lg">
                                <p className="text-slate-200">{item.descricao}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}