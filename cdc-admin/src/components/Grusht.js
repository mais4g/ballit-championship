import React, { useEffect, useState } from 'react';

const GrushtComponent = ({ timeA, timeB, encerrarGrusht }) => {
    const [grushtIniciado, setGrushtIniciado] = useState(false);
    const [tempoRestante, setTempoRestante] = useState(60);
        
    useEffect(() => {
        let timer;
        if (grushtIniciado && tempoRestante > 0) {
            timer = setInterval(() => {
                setTempoRestante(prevTempo => prevTempo - 1);
            }, 1000);
        } else if (tempoRestante === 0) {
            clearInterval(timer);
            handleEncerrarGrusht();
        }

        return () => clearInterval(timer);
    }, [grushtIniciado, tempoRestante]);

    const handleIniciarGrusht = () => {
        setGrushtIniciado(true);
    };

    const handleEncerrarGrusht = () => {
        encerrarGrusht();
        setGrushtIniciado(false);
        setTempoRestante(60);
    };

    return (
        <div>
            <h2>Grusht: {timeA?.nome ?? 'Time A indefinido'} vs {timeB?.nome ?? 'Time B indefinido'}</h2>

            <button onClick={handleIniciarGrusht} disabled={grushtIniciado}>
                Iniciar Grusht
            </button>

            <button onClick={handleEncerrarGrusht} disabled={!grushtIniciado}>
                Encerrar Grusht
            </button>

            {grushtIniciado && <p>Tempo Restante: {tempoRestante} segundos</p>}
        </div>
    );
};

export default GrushtComponent;
