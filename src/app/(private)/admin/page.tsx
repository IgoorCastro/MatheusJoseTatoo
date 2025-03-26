'use client'

import { AppSidebar } from "@/components/ui/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Carousel from "@/app/components/ui/carousel"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Upload from './upload/page';
import Portfolio from './galeria/page';
import { DataSchema } from "@/app/constants/data";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"

// export async function getActiveComponent(page: string): Promise<React.ReactNode> {
//     switch (page) {
//         case 'portfolio':
//             return <Portfolio />
//         default:
//             return <Carousel />
//     }
// }

export default function Page() {
    const [portfolio, setPortfolio] = useState<DataSchema>();
    const [activeComponent, setActiveComponent] = useState<React.ReactNode>();
    const params = useSearchParams();
    const page = params?.get('page') || '';
    console.log('page: ', page)
    useEffect(() => {
        const fectchData = async () => {
            try {
                const get = await fetch('/api/getPortfolio');

                if (!get) {
                    alert('Fetch Falhou');
                    return;
                }
                const res = await get.json();
                setPortfolio(res.data);
                setActiveComponent(<Carousel collection={res.data} />)
            } catch (err) { console.log(err) }
        };
        fectchData();
    }, []);
    
    // useEffect(() => {
    //     switch (page) {
    //         case 'portfolio':
    //             setActiveComponent(<Portfolio />)
    //         default:
    //             setActiveComponent(<Carousel collection={portfolio} />)
    //     }
    // }, [page])

    // const portfolio = await getPortfolio();
    console.log('portfolio: ', portfolio);
    return (
        <div className="relative w-screen h-screen">
            {page === 'upload' && (
                <Upload />
            )}
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Página do Administrador</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        <div className="min-h-[100vh] flex flex-1 justify-center items-center rounded-xl bg-slate-900 md:min-h-min">
                            {activeComponent}
                        </div>
                        {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="aspect-video rounded-xl bg-slate-300" />
                        <div className="aspect-video rounded-xl bg-slate-300" />
                        <div className="aspect-video rounded-xl bg-slate-300" />
                    </div> */}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}
