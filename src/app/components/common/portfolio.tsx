import Card from '../ui/card';
import { trabalhos } from '@/app/constants/data';

export default function Portfolio() {
    return (
        <div className='relative w-full h-max flex flex-col pt-20'>
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-16">
                {trabalhos.map((item, index) => (
                    <div key={index} className="w-auto">
                        <Card 
                            id={item.id} 
                            idPublico={item.idPublico}
                            capa={item.capa} 
                            titulo={item.titulo} 
                            desc={item.desc} 
                            imagens={item.imagens}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}