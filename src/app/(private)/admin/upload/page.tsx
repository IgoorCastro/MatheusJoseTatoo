import * as React from "react";
import {
  BadgeHelpIcon,
  X,
} from "lucide-react";
import InputImageUpload from "@/app/components/ui/input-image-upload";

export default function Page() {
  return (
    <div className="absolute z-20 h-[100vh] w-[100vw] flex justify-center items-center bg-black bg-opacity-60">
      <div className="h-full md:h-[90%] w-full md:w-[50%] flex flex-col rounded-3xl bg-zinc-800 shadow-xl shadow-black">
        <header className="w-full p-4 flex justify-between items-center">
          <h4 className="text-slate-100">Nova postagem</h4>
          <div className="flex gap-6">
            <BadgeHelpIcon
              color="rgba(241, 245, 249, 0.5)"
              className="size-6 cursor-pointer"
              onClick={() => alert('Preciso de ajuda')}
            />
            <X
              color="rgba(241, 245, 249, 0.5)" 
              className="size-6" 
              onClick={() => window.location.href = '/admin'}
            />
          </div>
        </header>
        <hr className="w-full" />
        <main className="h-full flex justify-center items-center overflow-hidden">
          <InputImageUpload />
        </main>
      </div>
    </div>
  )
}