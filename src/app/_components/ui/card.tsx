'use client'

import { DataSchema } from "@/app//constants/data";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Card({ item }: { item: DataSchema }) {
    // Ajustar o caminho da imagem
    // console.log("item.capa: ", item.capa)
    const normalizedPath = item.capa.replace(/\\/g, '/');

    const capaPath = normalizedPath.startsWith("public/")
        ? '/' + normalizedPath.replace('public/', '')
        : normalizedPath;

    // console.log('capaPath: ', capaPath);
    // const [showSlider, setShowSlider] = useState<boolean>(false);
    const router = useRouter();

    const handleClick = (idPublico: string) => {
        router.push(`/galeria/${idPublico}`);
    }
    return (
        <div
            className="w-auto h-auto flex flex-col items-center"
            onClick={() => handleClick(item.id_uuid)}
        >
            <div className="w-96 h-72 max-w-[95%] relative bg-slate-600 drop-shadow-md cursor-pointer">
                <Image
                    src={capaPath}
                    alt=""
                    fill
                    className="object-cover"
                />
            </div>
            <h3 className="py-2 text-center cursor-pointer text-lg" >{item.titulo || "Tatoo"}</h3>
        </div>
    );
}