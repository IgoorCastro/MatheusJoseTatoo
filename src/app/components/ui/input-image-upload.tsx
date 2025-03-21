'use client'

import CardUpload from "@/app/components/ui/cardUpload";
import { Button } from "@/components/ui/button";
// import Image from "next/image";
import { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export default function InputImageUpload() {
    const [image, setImage] = useState<File[]>([]);
    const [cover, setCover] = useState<File | null>(null);
    // const [desc, setDesc] = useState<string>('');
    const desc = useRef<string>('');
    const inputCoverRef = useRef<HTMLInputElement | null>(null);
    const inputCollectionRef = useRef<HTMLInputElement | null>(null);
    const textAreaRef= useRef<HTMLTextAreaElement | null>(null);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleFile(e.dataTransfer.files);
    }

    const handleFile = (files: FileList) => {
        // filtrar os arquivos para evitar uplaod de não imagens
        const imageFiles = Array.from(files).filter(file =>
            file.type.startsWith("image/") || /\.(jpe?g|png|gif|bmp|heic)$/i.test(file.name)
        );

        if (imageFiles.length < 1) return;

        setImage((prevStatus) => [...prevStatus, ...Array.from(imageFiles)]);
        // if (files) setImage();
    }

    // usar o metodo para evitar atualizações desnecessarias 
    // const handleDescChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     setDesc(e.target.value);
    // }, []);

    const handleCompletUpload = async () => {
        if (!cover) {
            alert('Imagem de capa obrigatória!');
            return
        }

       try{
        const formData = createFormData();

        console.log(`formData: ${formData}`);

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });


        if(!res){
            alert('Fetch Falhou');
            return;
        }

        const data = await res.json();

        console.log(`Server Res\nMessage: ${data.message}\nFiles: ${data.files}\nData: ${data.data}`);

       }catch(err){console.log(`Erro em 'handleCompletUpload': ${err}`)};
        alert('Construir handleCompletUpload');
    }

    const createFormData = () => {
        try {
            console.log(`Criando formData\n Cover: ${cover}\n image: ${image}\n desc: ${desc.current}\n`);
            const fd = new FormData();
            if (cover) fd.append('cover', cover);
            image.forEach((item) => fd.append('image', item));
            fd.append('desc', desc.current);
            fd.append('title', 'TesteTitle')
            return fd;
        } catch (er) { console.log(`Erro na função 'formData': ${er}`) }
    }

    const handleResetInput = () => {
        // setDesc('');
        desc.current = '';
        if(textAreaRef.current) textAreaRef.current.value = "";
        setImage([]);
        setCover(null);
    }

    return (
        <div
            className="w-full h-full flex flex-col gap-4 justify-center items-center py-4 px-2 md:px-16 overflow-hidden"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            <div className="flex flex-col justify-end items-center h-[60%] w-[90%]">
                <div className="flex flex-wrap justify-start items-start gap-3 h-full w-full p-2 rounded-2xl border border-slate-100 overflow-y-auto">
                    <input
                        type="file"
                        accept='image/*'
                        multiple
                        className="hidden"
                        onChange={(e) => {
                            console.log("Arquivos selecionados pelo input:", e.target.files);
                            if (e.target.files) handleFile(e.target.files);
                        }}
                        ref={inputCollectionRef}
                    />
                    <CardUpload item={null} inputClick={() => inputCollectionRef.current?.click()} />
                    {image.length > 0 &&
                        (image.map((item: File, index: number) =>
                            <CardUpload key={index} item={item ? item : null} />
                        ))
                    }
                </div>

                <label className="text-white text-xs text-center">Arraste e solte os arquivos de imagen para fazer o envio</label>
                <div className="flex justify-end items-center w-full mt-8">
                    <div className="grid w-full gap-1.5">
                        <label className="text-slate-100" htmlFor="message">Adicione uma descrição</label>
                        <Textarea
                            onChange={(e) => desc.current = e.target.value}
                            placeholder="Descrição"
                            id="message" 
                            ref={textAreaRef}
                        />
                    </div>
                </div>
            </div>
            <div className="rounded-2xl max-h-[30%] md:h-min p-1">
                <div className="flex flex-wrap flex-col justify-between items-center gap-1 rounded-2xl">
                    <input
                        type="file"
                        accept='image/*'
                        className="hidden"
                        onChange={(e) => e.target.files && setCover(e.target.files[0])}
                        ref={inputCoverRef}
                    />
                    {cover ?
                        (<CardUpload item={cover} inputClick={() => inputCoverRef.current?.click()} />)
                        :
                        (<CardUpload item={null} inputClick={() => inputCoverRef.current?.click()} />)
                    }
                    <label className="text-white text-xs text-center">Capa</label>
                </div>
            </div>
            <div className="flex gap-4 p-2">
                <Button onClick={handleCompletUpload} disabled={!desc && !cover ? true : false} >Enviar</Button>
                <Button onClick={handleResetInput}  >Limpar</Button>
            </div>
        </div>
    );
}