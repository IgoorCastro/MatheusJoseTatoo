'use client'

import { DataSchema } from "@/app//constants/data";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Card({ capa, titulo, idPublico }: DataSchema) {
    // const [showSlider, setShowSlider] = useState<boolean>(false);
    const router = useRouter();

    const handleClick = (idPublico: string) => {
        router.push(`/portfolio/${idPublico}`);
    }
    return (
        <div 
            className="w-auto h-auto flex flex-col items-center"
            onClick={() => handleClick(idPublico)}
        >
            <div className="w-96 h-72 max-w-[95%] relative bg-slate-600 drop-shadow-md cursor-pointer">
                <Image
                    src={capa || "/default-image.jpg"}
                    alt=""
                    fill
                    className="object-cover"
                />
            </div>
            <h3 className="py-2 text-center cursor-pointer text-lg" >{titulo || "Tatoo"}</h3>
        </div>
    );
}