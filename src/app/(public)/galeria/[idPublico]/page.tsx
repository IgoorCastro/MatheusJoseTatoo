
import Slider from "@/app/components/ui/slider";
import { DataSchema } from "@/app/constants/data";
import { X } from "lucide-react";
import Link from "next/link";

export async function getImagesByCollection(page: string): Promise<DataSchema | null> {
    try {
        const collection = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/getItem`, {
            method: 'POST',
            cache: "no-store",
            body: JSON.stringify(page),
        });

        const res = await collection.json();

        if (!res.data || res.data.length === 0) {
            console.error("Nenhum dado encontrado!");
            return null;
        }

        return res.data[0] as DataSchema;
    } catch (err) {
        console.error('Erro no getImages:', err);
        return null;
    }
}

export default async function CollectionPage({ params }: { params: { idPublico: string } }) {
    const { idPublico } = await params;
    const trab = await getImagesByCollection(idPublico);

    console.log(trab);

    if (!trab) return <div className="absolute w-screen h-screen bg-slate-500"><p>Carregando...</p></div>;
    // if (trab typeof DataSchema) return <div className="absolute w-screen h-screen bg-slate-500"><p>Coleção não encontrada</p></div>;

    return (
        <div className="relative w-screen h-screen flex flex-col justify-end md:justify-start items-center bg-[#242526]">
            {/* <h1 className="text-center text-2xl font-bold mb-4">Coleção {params.id}</h1> */}
            <div className="absolute z-20 top-0 w-full flex py-2 px-4">
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
            <Slider item={trab} />
        </div>
    );
}
