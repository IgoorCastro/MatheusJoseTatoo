'use client'

import { useRef, useState } from 'react';
import Header from '@/app/components/common/header';
import Portfolio from '@/app/components/common/portfolio';
import Sobre from '@/app/components/common/sobre';
import Contato from '@/app/components/common/contato';
import DevInfo from '@/app/components/ui/devInfo';

export default function Home() {
  const [selectedPage, setSelectedPage] = useState<string>('portfolio');
  const topRef = useRef<HTMLDivElement>(null);

  const renderPage = () => {
    switch (selectedPage) {
      case 'portfolio':
        return <Portfolio />
      case 'sobre':
        return <Sobre />
      case 'contato':
        return <Contato />
      default:
        return <Portfolio />
    }
  }

  return (
    <div className='w-full h-screen'>
      <div className='w-full h-full flex flex-col'>
        <Header setSelectedPage={setSelectedPage} />
        <div className='w-full h-full flex flex-col items-center justify-around' ref={topRef}>
          <div className='w-full md:w-[85%] flex justify-center'>
            {renderPage()}
          </div>
          {selectedPage === 'portfolio' && (
            <p
              className='w-min h-min whitespace-nowrap text-black cursor-pointer mt-20'
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              ↑ Voltar ao topo
            </p>
          )}
          <div className={selectedPage === 'portfolio' ? 'py-20' : 'py-0'}>
            <DevInfo />
          </div>
        </div>
      </div>
    </div>
  );
}