import {StaticImageData} from 'next/image';
import capa1 from '@/app/assets/test/5.jpg';
import capa2 from '@/app/assets/test/6.jpg';
import capa3 from '@/app/assets/test/4.jpg';
import capa4 from '@/app/assets/test/3.jpg';
import capa5 from '@/app/assets/test/2.jpg';
import capa6 from '@/app/assets/test/1.jpg';

export interface DataSchema{
    id: string;
    idPublico: string;
    capa: StaticImageData;
    imagens?: StaticImageData[];
    titulo: string;
    desc: string;
}

export const trabalhos: DataSchema[] = [
    {
        id: "1",
        idPublico: '19ec5e2-4347-4fc9-8cbf-2cc4dcf44e08',
        capa: capa1,
        titulo: 'Zeus',
        desc: "Zeus, o deus do trovão, em uma tatuagem com detalhes que expressam poder e majestade. O processo de realização dessa tatuagem foi desafiador, devido à textura da pele do cliente, que exigiu uma atenção especial nos contornos e nas sombras.",
        imagens: [capa2, capa3, capa4, capa5, capa6]
    },
    {
        id: "2",
        idPublico: '087a2741-1174-4c25-b316-82cb0ff18f0d',
        capa: capa2,
        titulo: 'Catrina',
        desc: "A Catrina é um ícone da cultura mexicana, e esta tatuagem foi feita para homenagear essa tradição. A pele do cliente era mais clara, o que facilitou a definição dos detalhes finos, mas a aplicação das cores vibrantes exigiu um toque preciso para garantir que os tons se mantivessem vivos.",
        imagens: [capa1, capa3, capa4, capa5, capa6]
    },
    {
        id: "3",
        idPublico: '9282c86d-7e32-4da1-bbac-b04c0544fcc8',
        capa: capa3,
        titulo: 'Letreiro',
        desc: "Uma tatuagem de letreiro com um design mais clássico, mas com um toque de modernidade. Foi realizada em uma área com pele mais firme, o que ajudou a criar linhas nítidas, mas também exigiu um processo de cicatrização mais cuidadoso.",
        imagens: [capa2, capa1, capa4, capa5, capa6]
    },
    {
        id: "4",
        idPublico: '7c2cacd7-b381-4754-8a2a-8725f4a510c8',
        capa: capa4,
        titulo: 'Leão',
        desc: "O Leão, símbolo de força e coragem, foi feito em uma pele mais oleosa, o que fez com que a tatuagem precisasse de mais cuidados com a saturação de tinta. O design detalhado exigiu várias sessões para garantir que os contornos fossem claros e definidos.",
        imagens: [capa2, capa3, capa1, capa5, capa6]
    },
    {
        id: "5",
        idPublico: 'ade7990c-b427-467f-95eb-47489d6ad004',
        capa: capa5,
        titulo: 'Proteção',
        desc: "Essa tatuagem foi projetada para simbolizar a proteção e foi aplicada em uma pele sensível, o que exigiu um uso mais leve de agulha para evitar irritação. A cliente pediu um design simples e imponente ao mesmo tempo, e o resultado ficou perfeito.",
        imagens: [capa1, capa3, capa4, capa2, capa6]
    },
    {
        id: "6",
        idPublico: 'b2dd8f68-7f12-4a2c-8d3d-0eb9eee7ea21',
        capa: capa6,
        titulo: 'Leão + Mulheres',
        desc: "Uma tatuagem com dois elementos poderosos: o leão e a figura feminina. A pele mais escura do cliente fez com que fosse necessário trabalhar com tons de tinta mais intensos para garantir que o design fosse visível e chamativo. O trabalho levou várias sessões para alcançar o nível de detalhamento desejado.",
        imagens: [capa4, capa1, capa2, capa5, capa3]
    },
    {
        id: "7",
        idPublico: 'd53f54cf-7f06-4523-acd6-2e89b6981a4a',
        capa: capa6,
        titulo: 'Leão + Mulher',
        desc: "A combinação de um leão com a figura feminina é uma representação de equilíbrio e poder. A tatuagem foi feita em uma pele com um tom mais claro, o que permitiu uma definição de sombras mais precisa. A clienta adorou o resultado final, que ficou ainda mais realista após a cicatrização.",
        imagens: [capa2, capa3, capa4, capa5, capa1]
    },
];

// export const trabalhos: DataSchema[] = [
//     {
//         id: "1",
//         capa: capa1,
//         titulo: 'Zeus',
//         desc: "Zeus, o deus do trovão, em uma tatuagem com detalhes que expressam poder e majestade. O processo de realização dessa tatuagem foi desafiador, devido à textura da pele do cliente, que exigiu uma atenção especial nos contornos e nas sombras.",
//         imagens: [capa2, capa3, capa4, capa5, capa6]
//     },
//     {
//         id: "2",
//         capa: capa2,
//         titulo: 'Catrina',
//         desc: "A Catrina é um ícone da cultura mexicana, e esta tatuagem foi feita para homenagear essa tradição. A pele do cliente era mais clara, o que facilitou a definição dos detalhes finos, mas a aplicação das cores vibrantes exigiu um toque preciso para garantir que os tons se mantivessem vivos.",
//         imagens: [capa1, capa3, capa4, capa5, capa6]
//     },
//     {
//         id: "3",
//         capa: capa3,
//         titulo: 'Letreiro',
//         desc: "Uma tatuagem de letreiro com um design mais clássico, mas com um toque de modernidade. Foi realizada em uma área com pele mais firme, o que ajudou a criar linhas nítidas, mas também exigiu um processo de cicatrização mais cuidadoso.",
//         imagens: [capa2, capa1, capa4, capa5, capa6]
//     },
//     {
//         id: "4",
//         capa: capa4,
//         titulo: 'Leão',
//         desc: "O Leão, símbolo de força e coragem, foi feito em uma pele mais oleosa, o que fez com que a tatuagem precisasse de mais cuidados com a saturação de tinta. O design detalhado exigiu várias sessões para garantir que os contornos fossem claros e definidos.",
//         imagens: [capa2, capa3, capa1, capa5, capa6]
//     },
//     {
//         id: "5",
//         capa: capa5,
//         titulo: 'Proteção',
//         desc: "Essa tatuagem foi projetada para simbolizar a proteção e foi aplicada em uma pele sensível, o que exigiu um uso mais leve de agulha para evitar irritação. A cliente pediu um design simples e imponente ao mesmo tempo, e o resultado ficou perfeito.",
//         imagens: [capa1, capa3, capa4, capa2, capa6]
//     },
//     {
//         id: "6",
//         capa: capa6,
//         titulo: 'Leão + Mulheres',
//         desc: "Uma tatuagem com dois elementos poderosos: o leão e a figura feminina. A pele mais escura do cliente fez com que fosse necessário trabalhar com tons de tinta mais intensos para garantir que o design fosse visível e chamativo. O trabalho levou várias sessões para alcançar o nível de detalhamento desejado.",
//         imagens: [capa4, capa1, capa2, capa5, capa3]
//     },
//     {
//         id: "7",
//         capa: capa6,
//         titulo: 'Leão + Mulher',
//         desc: "A combinação de um leão com a figura feminina é uma representação de equilíbrio e poder. A tatuagem foi feita em uma pele com um tom mais claro, o que permitiu uma definição de sombras mais precisa. A clienta adorou o resultado final, que ficou ainda mais realista após a cicatrização.",
//         imagens: [capa2, capa3, capa4, capa5, capa1]
//     },
// ];


export const getTrabalhoByIdPublic = (id: string): DataSchema | null => {
    console.log('id: ', id);
    const res = trabalhos.find(item => item.idPublico === id);
    return res ? res : null; 
};

// export const getTrabalhoById = (id: string): StaticImageData[] | StaticImageData | undefined => {
//     const res = trabalhos.find(item => item.id === id);
//     return res?.imagens ? res.imagens : res?.capa; 
// };
