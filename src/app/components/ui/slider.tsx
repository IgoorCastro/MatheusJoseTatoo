'use client'

import Image from "next/image";
import { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { DataSchema } from "@/app/constants/data";
// import { Buffer } from "buffer";


export default function Slider({ item }: { item: DataSchema }) {
    const [currentSliderImg, setCurrentSliderImg] = useState<StaticImageData | undefined>(item.capa);
    const [currentItem, setCurrentItem] = useState<DataSchema>();
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const imgCollect = item.imagens;

    useEffect(() => {
        if (!item.imagens?.includes(item.capa))
            imgCollect?.unshift(item.capa);
    }, [item, imgCollect]);

    useEffect(() => {
        setCurrentItem(item);
        setCurrentSliderImg(Array.isArray(imgCollect) ? imgCollect[currentIndex] : imgCollect);
    }, [item, currentIndex, imgCollect]);

    const handleNextClick = () => {
        setCurrentIndex(prevs => prevs + 1)
    }

    const handlePreviousClick = () => {
        setCurrentIndex(prevs => prevs - 1)
    }

    if(!item) return <div className="absolute w-screen h-screen bg-slate-500"><p>Carregando...</p></div>;
    if(!item.imagens) return <div className="absolute w-screen h-screen bg-slate-500"><p>Coleção nao encontrada...</p></div>;

    return (
        <div className="w-[100%] sm:w-[90%] md:w-[75%] h-[85%] sm:border-2 sm:border-slate-700 rounded-sm">
            {currentSliderImg && (
                <div className="w-full h-full flex flex-col sm:flex-row">
                    <div className="relative w-full sm:w-[75%] h-full flex flex-row items-center gap-16">
                        {currentIndex > 0 && (
                            <div className="absolute left-0 z-10 w-10 md:w-14 h-auto p-2 md:p-4 flex justify-center items-center ml-5 aspect-square rounded-[50%] border-2 border-slate-200 cursor-pointer transition-transform duration-500 ease-in-out hover:translate-x-[-4px]"
                                onClick={handlePreviousClick}>
                                <svg fill="#E2E8F0" version="1.1" id="XMLID_54_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g id="previous">
                                        <g>
                                            <polygon points="17.2,23.7 5.4,12 17.2,0.3 18.5,1.7 8.4,12 18.5,22.3 		" />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        )}

                        <Image
                            src={currentSliderImg || "/default-image.jpg"}
                            alt=""
                            fill
                            className="object-cover"
                        />

                        {item.imagens && currentIndex < item.imagens.length - 1 && (
                            <div className="absolute right-0 z-10 w-10 md:w-14 h-auto p-2 md:p-4 flex justify-center items-center mr-5 aspect-square rounded-[50%] border-2 border-slate-200 cursor-pointer transition-transform duration-500 ease-in-out hover:translate-x-[-4px]"
                                onClick={handleNextClick}>
                                <svg fill="#E2E8F0 " version="1.1" id="XMLID_287_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g id="next">
                                        <g>
                                            <polygon points="6.8,23.7 5.4,22.3 15.7,12 5.4,1.7 6.8,0.3 18.5,12 		" />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        )}
                    </div>
                    <div className="h-full w-full sm:w-[35%] px-2 md:px-5 py-3 md:py-8 flex flex-col gap-4 md:gap-5">
                        <h3 className="ml-2 text-slate-300">{currentItem?.titulo}</h3>
                        <div className="flex justify-start items-start p-3 bg-[#353738] rounded-lg">
                            <p className="text-slate-200">{currentItem?.desc}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}