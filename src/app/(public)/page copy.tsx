'use client'

import { useRef } from 'react';
import Header from '@/app/_components/common/header';
import Portfolio from '@/app/_components/common/portfolio';
import Sobre from '@/app/_components/common/sobre';
import Contato from '@/app/_components/common/contato';
import DevInfo from '@/app/_components/ui/devInfo';
import { useSearchParams } from 'next/dist/client/components/navigation';

export default function Home() {
  const topRef = useRef<HTMLDivElement>(null);
  const params = useSearchParams();
  const page = params?.get('page');

  const renderPage = () => {
    switch (page) {
      case 'sobre':
        return <Sobre />
      case 'contato':
        return <Contato />
      default:
        return <Portfolio />
    }
  }

  return (
      <div className='w-screen h-screen flex flex-col overflow-x-hidden'>
        <Header/>
        <div className='w-full h-full max-w-[100%] flex flex-col items-center justify-around' ref={topRef}>
          <div className='w-full md:w-[85%] flex justify-center'>
            {renderPage()}
          </div>
          {page === '' || !page && (
            <p
              className='w-min h-min whitespace-nowrap text-black cursor-pointer mt-20'
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              ↑ Voltar ao topo
            </p>
          )}
          <div className={page === '' || !page ? 'py-20' : 'py-0'}>
            <DevInfo />
          </div>
        </div>
      </div>
  );
}