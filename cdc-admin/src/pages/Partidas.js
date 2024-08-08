import { useRouter } from "next/router";
import Partida from "@/components/Partida";
import { useEffect, useState } from "react";

const PartidaPage = () =>{
    const router = useRouter();
    const { timeA, timeB } = router.query;

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (router.isReady){
            setIsReady(true);
        }
    }, [router.isReady]);

    const encerrarPartida = (vencedor) => {
        //logica p encerrar
    };

    if (!isReady){
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <h1>Partida entre {timeA} e {timeB}</h1>
            <Partida timeA={timeA} timeB={timeB} registrarResultado={encerrarPartida} />
        </div>
    );
};

export default PartidaPage;