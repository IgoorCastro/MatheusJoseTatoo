'use client'

import { useRef } from 'react';
import Header from '@/app/_components/common/header';
import Portfolio from '@/app/_components/common/portfolio';
import Sobre from '@/app/_components/common/sobre';
import Contato from '@/app/_components/common/contato';
import DevInfo from '@/app/_components/ui/devInfo';
import { useSearchParams } from 'next/dist/client/components/navigation';

export default function Home() {
  // const topRef = useRef<HTMLDivElement>(null);
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
    <div className='w-full h-full flex flex-col overflow-x-hidden'>
        <div className='w-full h-full max-w-[100%] flex justify-center'>
          {renderPage()}
        </div>
    </div>
  );
}