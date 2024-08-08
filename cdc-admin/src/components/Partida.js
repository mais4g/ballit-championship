import React, { useState, useEffect } from 'react';

const Partida = ({ timeA, timeB, encerrarPartida, iniciarGrusht }) => {
    const [pontosTimeA, setPontosTimeA] = useState(timeA.pontosTotais);
    const [pontosTimeB, setPontosTimeB] = useState(timeB.pontosTotais);
    const [blotsA, setBlotsA] = useState(timeA.blots);
    const [blotsB, setBlotsB] = useState(timeB.blots);
    const [plifsA, setPlifsA] = useState(timeA.plifs);
    const [plifsB, setPlifsB] = useState(timeB.plifs);
    const [advrunghsA, setAdvrunghsA] = useState(timeA.advrunghs);
    const [advrunghsB, setAdvrunghsB] = useState(timeB.advrunghs);

    useEffect(() => {
        setPontosTimeA(timeA.pontosTotais);
        setPontosTimeB(timeB.pontosTotais);
        setBlotsA(timeA.blots);
        setBlotsB(timeB.blots);
        setPlifsA(timeA.plifs);
        setPlifsB(timeB.plifs);
        setAdvrunghsA(timeA.advrunghs);
        setAdvrunghsB(timeB.advrunghs);
    }, [timeA, timeB]);

    const handleBlotsChange = (team, increment) => {
        if (team === 'A') {
            setBlotsA(prev => Math.max(0, prev + increment));
        } else {
            setBlotsB(prev => Math.max(0, prev + increment));
        }
    };

    const handlePlifsChange = (team, increment) => {
        if (team === 'A') {
            setPlifsA(prev => Math.max(0, prev + increment));
        } else {
            setPlifsB(prev => Math.max(0, prev + increment));
        }
    };

    const handleAdvrunghsChange = (team, increment) => {
        if (team === 'A') {
            setAdvrunghsA(prev => Math.max(0, prev + increment));
        } else {
            setAdvrunghsB(prev => Math.max(0, prev + increment));
        }
    };

    const handleEncerrarPartida = () => {
        const pontosFinaisA = blotsA + plifsA - advrunghsA;
        const pontosFinaisB = blotsB + plifsB - advrunghsB;

        if (pontosFinaisA === pontosFinaisB) {
            iniciarGrusht();
        } else {
            const resultado = {
                timeA: { ...timeA, blots: blotsA, plifs: plifsA, advrunghs: advrunghsA, pontosTotais: pontosFinaisA },
                timeB: { ...timeB, blots: blotsB, plifs: plifsB, advrunghs: advrunghsB, pontosTotais: pontosFinaisB },
            };
            encerrarPartida(pontosFinaisA > pontosFinaisB ? timeA : timeB, resultado);
        }
    };

    return (
        <div>
            <h2>{timeA.nome} vs {timeB.nome}</h2>
            <div>
                <h3>{timeA.nome}</h3>
                <p>Pontos: {pontosTimeA}</p>
                <div>
                    <label>Blots: {blotsA} </label>
                    <button onClick={() => handleBlotsChange('A', 1)}>+</button>
                    <button onClick={() => handleBlotsChange('A', -1)}>-</button>
                </div>
                <div>
                    <label>Plifs: {plifsA} </label>
                    <button onClick={() => handlePlifsChange('A', 1)}>+</button>
                    <button onClick={() => handlePlifsChange('A', -1)}>-</button>
                </div>
                <div>
                    <label>Advrunghs: {advrunghsA} </label>
                    <button onClick={() => handleAdvrunghsChange('A', 1)}>+</button>
                    <button onClick={() => handleAdvrunghsChange('A', -1)}>-</button>
                </div>
            </div>
            <div>
                <h3>{timeB.nome}</h3>
                <p>Pontos: {pontosTimeB}</p>
                <div>
                    <label>Blots: {blotsB} </label>
                    <button onClick={() => handleBlotsChange('B', 1)}>+</button>
                    <button onClick={() => handleBlotsChange('B', -1)}>-</button>
                </div>
                <div>
                    <label>Plifs: {plifsB} </label>
                    <button onClick={() => handlePlifsChange('B', 1)}>+</button>
                    <button onClick={() => handlePlifsChange('B', -1)}>-</button>
                </div>
                <div>
                    <label>Advrunghs: {advrunghsB} </label>
                    <button onClick={() => handleAdvrunghsChange('B', 1)}>+</button>
                    <button onClick={() => handleAdvrunghsChange('B', -1)}>-</button>
                </div>
            </div>
            <button onClick={handleEncerrarPartida}>Encerrar Partida</button>
        </div>
    );
};

export default Partida;
