import Slider from "@/app/_components/ui/slider";
import { DataSchema } from "@/app/constants/data";

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

    if (!trab) return <div className="absolute w-screen h-screen bg-slate-500"><p>Carregando...</p></div>;
    // if (trab typeof DataSchema) return <div className="absolute w-screen h-screen bg-slate-500"><p>Coleção não encontrada</p></div>;

    return (
        <div className="relative w-screen h-screen flex flex-col justify-center items-center bg-[#242526]">
            <Slider item={trab} />
        </div>
    );
}
