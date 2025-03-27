'use client'

import { useRef, useState } from 'react';
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from '@/app/_components/ui/logo';
import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';


export default function Login() {
  const [usuario, setUsuario] = useState<string>();
  const [senha, setSenha] = useState<string>();
  const [erro, setErro] = useState<string>();
  const btnRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();

  const handleClick = async () => {
    try {
      const resFetch = await fetch('/api/authApi', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, senha }),
      });

      const res = await resFetch.json();

      if(res.token) {
        document.cookie = `token=${res.token}; path=/; max-agr=604800`; // salva o token no cookie por 7 dias
        router.push('/admin');
      }
      setErro(res.message); // so por hora
    } catch (err) { console.log('Erro durante fetch. \nErro: ', err) };
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-slate-300'>
      <div className="w-min h-min flex items-center justify-center flex-col bg-[#3A3B3C] rounded-xl py-14 px-7 gap-16 relative">
      <Image
        aria-hidden
        src="/logout.svg"
        alt="Logout icon"
        width={30}
        height={30}
        className='absolute left-1 right-0 bottom-0 top-1 cursor-pointer'
        onClick={() => router.push('/')}
      />
      <header className='w-min flex flex-col items-center'>
        <Logo onClick={() => router.push('/')} />
      </header>
      <main className='w-80 flex flex-col gap-6'>
        <p className='text-red-600 text-center'>{erro}</p>
        <Input
          placeholder='Usuário'
          onChange={(e) => setUsuario(e.target.value)}
        />

        <Input
          placeholder='Senha'
          type='password'
          onKeyDown={(e) => { if(e.key === 'Enter') btnRef.current?.click()} }
          onChange={(e) => setSenha(e.target.value)}
        />

        <Button ref={btnRef} onClick={handleClick}>Entrar</Button>
      </main>
    </div>
    </div>
  );
}
