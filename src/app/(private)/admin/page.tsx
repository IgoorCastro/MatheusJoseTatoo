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
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useSearchParams } from "next/navigation";
import Upload from './upload/page';
import Portfolio from './portfolio/page';

export default function Page() {
    const searchParams = useSearchParams();
    const page = searchParams?.get("page"); // retorna os parametro que acompanham page

    let activeComponent: React.ReactNode = <Carousel />;
    console.log(`Page: ${page}`);
    switch (page) {
        case "portfolio":
            activeComponent = <Portfolio />
            break;
        default:
            activeComponent = <Carousel />
            break;
    }

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

