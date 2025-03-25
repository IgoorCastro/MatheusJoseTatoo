'use client'

import { useEffect, useState } from 'react';
import { DataSchema } from '@/app/constants/data';
import CardLoading from '../ui/cardLoading';
import Card from '../ui/card';

export default function Portfolio() {
    const [trabalhos, setTrabalhos] = useState<DataSchema[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const get = await fetch('/api/getPortfolio');

                if (!get) {
                    alert('Fetch Falhou');
                    return;
                }
                const res = await get.json();
                console.log(res.data)
                setTrabalhos(res.data);
            } catch (err) {
                console.error('Erro no fetch:', err);
                return { props: { trabalhos: [] } };
            } finally {
                setLoading(false);
            };
        }
        fetchData();
    }, []);

    return (
        <div className='w-full h-max flex flex-col pt-10 md:pt-20'>
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-14">
                {loading ?
                    (
                        // Loader enquanto carrega os dados
                        <div className="w-auto">
                            <CardLoading />
                        </div>
                    ) :
                    (
                        trabalhos.length > 0 ? (
                            trabalhos.map((item) => (
                                <div key={item.id_uuid} className="w-auto">
                                    <Card item={item} />
                                </div>
                            ))
                        )
                            :
                            (<p className="text-center w-full">Nenhum trabalho encontrado.</p>)
                    )}
            </div>
        </div>
    );
}