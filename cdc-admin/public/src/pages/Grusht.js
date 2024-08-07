import React, { useState } from 'react';

const Grusht = ({ timeA, timeB, encerrarGrusht }) => {
    const [grushtIniciado, setGrushtIniciado] = useState(false);

    const handleIniciarGrusht = () => {
        setGrushtIniciado(true);
    };

    const handleEncerrarGrusht = () => {
        encerrarGrusht();
        setGrushtIniciado(false);
    };

    return (
        <div>
            <h2>Grusht: {timeA.nome} vs {timeB.nome}</h2>
            <button onClick={handleIniciarGrusht} disabled={grushtIniciado}>Iniciar Grusht</button>
            <button onClick={handleEncerrarGrusht} disabled={!grushtIniciado}>Encerrar Grusht</button>
        </div>
    );
};

export default Grusht;
