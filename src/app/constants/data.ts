
export interface DataSchema{
    id?: string;
    id_uuid: string;
    capa: string;
    colecao?: string[];
    titulo: string;
    descricao: string;
    data: string;
}

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


// export const getTrabalhoByIdPublic = (id: string): DataSchema | null => {
//     console.log('id: ', id);
//     const res = trabalhos.find(item => item.idPublico === id);
//     return res ? res : null; 
// };

// export const getTrabalhoById = (id: string): StaticImageData[] | StaticImageData | undefined => {
//     const res = trabalhos.find(item => item.id === id);
//     return res?.imagens ? res.imagens : res?.capa; 
// };
