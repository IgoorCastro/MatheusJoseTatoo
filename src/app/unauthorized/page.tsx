'use client';

import { useRouter } from "next/navigation";
import { Button } from "../_components/ui/button";

const UnauthorizeState = () => {
    const router = useRouter();
    return (
        <div className="flex justify-center items-center">
            <h3>Pera lá!</h3>
            <h4>Você não tem autorização para acessar esta página</h4>
            <Button onClick={() => router.push('/login')}>Voltar</Button>
        </div>
    );
  };
  
  export default UnauthorizeState;