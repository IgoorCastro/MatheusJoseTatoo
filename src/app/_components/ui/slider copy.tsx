'use client'

import Image from "next/image";
import { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
// import { Buffer } from "buffer";

interface SliderProps {
    imageCollects?: StaticImageData[];
}
export default function Slider({ imageCollects }: SliderProps) {
    const [currentSliderImg, setCurrentSliderImg] = useState<StaticImageData>();
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        setCurrentSliderImg(Array.isArray(imageCollects) ? imageCollects[currentIndex] : imageCollects);
    }, [imageCollects, currentIndex]);

    const handleNextClick = () => {
        setCurrentIndex(prevs => prevs + 1)
    }

    const handlePreviousClick = () => {
        setCurrentIndex(prevs => prevs - 1)
    }

    return (
        <div className="w-[90%] h-[90%] bg-slate-400 border">
            {imageCollects && (
                <div className="w-full h-full flex flex-row">
                    <div className="relative min-w-[70%] h-full flex flex-row items-center gap-16 border border-slate-700">
                        {currentIndex > 0 && (
                            <div className="absolute left-0 z-10 w-14 h-auto p-4 flex justify-center items-center ml-5 aspect-square rounded-[50%] border-2 border-slate-200 cursor-pointer transition-transform duration-500 ease-in-out hover:translate-x-[-4px]"
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

                        {currentIndex < imageCollects.length - 1 && (
                            <div className="absolute right-0 z-10 w-14 h-auto p-4 flex justify-center items-center mr-5 aspect-square rounded-[50%] border-2 border-slate-200 cursor-pointer transition-transform duration-500 ease-in-out hover:translate-x-[-4px]"
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
                    <div className="h-full w-full bg-red-400">
a
                    </div>
                </div>
            )}
        </div>
    );
}