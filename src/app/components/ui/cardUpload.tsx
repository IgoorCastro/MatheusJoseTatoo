import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Plus, Trash } from "lucide-react"

export default function CardUpload({ item, inputClick }: { item: File | null, inputClick?: () => void }) {
  return (
    <Card className="flex rounded-2xl p-0 m-0 border-none shadow-2xl h-min bg-zinc-800">
      <CardContent className="p-0 flex items-center justify-start">
        {item ?
          <div className="relative flex justify-center items-center w-[85px] sm:w-[100px] md:w-[115px] h-[100px] sm:h-[120px] md:h-[135px]  rounded-2xl overflow-hidden">
            <Image
              src={URL.createObjectURL(item)}
              fill
              alt=""
              className="rounded-2xl border-none"
            />
            <div className="absolute bottom-0 flex items-center justify-center bg-black w-full bg-opacity-50 hover:bg-opacity-60 transition-colors duration-300 rounded-sm py-1">
              <Trash
                color="rgba(241, 245, 249, 0.8)"
                size={25}
                className="cursor-pointer drop-shadow-2xl shadow-white hover:scale-[1.2] transition-all duration-500"
                onClick={() => alert(`Apagar item: ${URL.createObjectURL(item)}`)}
              />
            </div>
          </div>
          :
          <div
            className="flex items-center justify-center w-[85px] sm:w-[100px] md:w-[115px] h-[100px] sm:h-[120px] md:h-[135px] bg-zinc-800 border rounded-2xl cursor-pointer hover:animate-twist"
            onClick={() => inputClick && inputClick()}
          >
            <Plus
              color="rgba(241, 245, 249, 0.8)"
              size={40}
            />
          </div>
        }
        {/* <span className="text-4xl font-semibold">{1}</span> */}
      </CardContent>
    </Card>
  )
}
