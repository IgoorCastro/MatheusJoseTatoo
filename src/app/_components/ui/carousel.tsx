import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { DataSchema } from "@/app/constants/data"
import Image from "next/image"

export default function CarouselDemo({ collection }: { collection: DataSchema[] }) {
  console.log('collectionxx: ', collection);
  collection.map(item => {
    console.log(item);
  })

  const normalizedPath = (path: string) => {
    const rep = path.replace(/\\/g, '/');
    return rep.replace('public/', '/');
  }
  return (
    <Carousel className="w-full max-w-[60%]">
      <h3 className="absolute top-[-50px] text-white">Ultimos uploads</h3>
      <CarouselContent className="bg-none">
        {Array.from(collection).map((item: DataSchema) => (
          <CarouselItem 
              key={item.id_uuid}
              onClick={() => console.log('Item clicado: ', item)}
            >
            <div className="flex flex-col justify-center bg-none">
              <Card className="border-none">
                <CardContent className="relative flex aspect-video items-center justify-center p-6 cursor-pointer">
                  <Image
                    className="rounded-lg object-cover"
                    src={normalizedPath(item.capa)}
                    fill
                    alt=""
                  />
                </CardContent>
                <CardContent className="w-full flex items-center justify-center mt-2 p-0">
                <label className="text-slate-200 text-lg">{item.titulo}</label>
                </CardContent>
              </Card>
                
                
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
